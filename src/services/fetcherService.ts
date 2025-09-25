import getCrypto from "../config/coingecko";
import { getRedisClient } from "../config/redis";

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
