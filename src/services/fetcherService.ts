import getCrypto from "../config/coingecko";
import { getRedisClient } from "../config/redis";

export const getCryptoPrice = async (coinID: string, currency: string) => {
  const redis = getRedisClient();
  const cacheKey = `price:${coinID}:${currency}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return parseFloat(cached);
  }

  const price = await getCrypto(coinID, currency);
  await redis.set(cacheKey, price.toString(), { EX: 30 }); 
  return price;
};
