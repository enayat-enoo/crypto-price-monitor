import getCrypto from "../config/coingecko";
import { getRedisClient } from "../config/redis";
import { evaluateAlerts } from "./alertService";

// Store a coin in the active coins set
export const addActiveCoin = async (coinID: string) => {
  const redis = getRedisClient();
  await redis.sAdd("activeCoins", coinID); // Redis Set keeps unique coins
};

// Fetch price with caching
export const getCryptoPrice = async (coinID: string, currency: string) => {
  const redis = getRedisClient();
  const cacheKey = `price:${coinID}:${currency}`;

  // Add to active coins set
  await addActiveCoin(coinID);

  // Check redis cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log(`Using cached price for ${coinID}`);
    return parseFloat(cached);
  }

  try {
    const price = await getCrypto(coinID, currency);
    if (!price) throw new Error("Invalid coin or currency");

    console.log(`Fetched price from CoinGecko API for ${coinID}`);
    await redis.set(cacheKey, price.toString(), { EX: 30 });
    return price;
  } catch (error) {
    throw new Error("Invalid coin or currency");
  }
};

// Background polling
export async function pollPrices() {
  const redis = getRedisClient();
  const coins = await redis.sMembers("activeCoins");
  const currency = "usd";

  for (const coin of coins) {
    try {
      const price = await getCrypto(coin, currency);
      await redis.set(`price:${coin}:${currency}`, price.toString(), {
        EX: 30,
      });
      console.log(`[Polling] Updated ${coin} price in Redis: ${price}`);
    } catch (err) {
      console.error(`[Polling Error] ${coin}:`, err);
    }
  }

  // Evaluate alerts
  await evaluateAlerts();
}

export function startPolling() {
  setInterval(pollPrices, 30_000);
}
