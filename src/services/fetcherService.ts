import getCrypto from "../config/coingecko";
import { getRedisClient } from "../config/redis";
import { evaluateAlerts } from "./alertService";


export const getCryptoPrice = async (coinID: string, currency: string) => {
  const redis = getRedisClient();
  const cacheKey = `price:${coinID}:${currency}`;

  // Check if the price is already cached
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log(`Using cached price for from redis cache ${coinID}`);
    return parseFloat(cached);
  }

  // If not, fetch the price and cache it
  const price = await getCrypto(coinID, currency);

  console.log(`fetched price from coingecko API for ${coinID}`);

  // Set the expiration time to 30 seconds
  await redis.set(cacheKey, price.toString(), { EX: 30 }); 
  return price;
};


//Background Polling

export async function pollPrices() {
  const coins = ["bitcoin", "ethereum"]; // Add more coins as needed
  const currency = "usd";

  const redis = getRedisClient();

  for (const coin of coins) {
    try {
      const price = await getCrypto(coin, currency);

      await redis.set(`price:${coin}:${currency}`, price.toString(), { EX: 30 });

      console.log(`[Polling] Updated ${coin} price in Redis: ${price}`);
    } catch (err) {
      console.error(`[Polling Error] ${coin}:`, err);
    }
  }
  // Evaluate alerts
  await evaluateAlerts();
}

// Call this from server.ts to start automatic polling
export function startPolling() {
  setInterval(pollPrices, 30_000); // every 30 seconds
}