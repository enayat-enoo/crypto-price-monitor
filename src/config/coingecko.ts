import axios from "axios";
import dotenv from "dotenv";
import  { getRedisClient } from "./redis";
dotenv.config();



const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

async function getCrypto(coinID: string, currency: string):Promise<number> {
    const redisClient = getRedisClient();
    const cachedKey = `price:${coinID}:${currency}`;
  try {

    const cachedPrice = await redisClient.get(cachedKey);
    if (cachedPrice) {
      return parseFloat(cachedPrice);
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coinID,
          vs_currencies: currency,
        },
        headers: COINGECKO_API_KEY
          ? { "x-cg-demo-api-key": COINGECKO_API_KEY }
          : {},
      }
    );

    const price = response.data[coinID][currency];
    await redisClient.set(cachedKey, price.toString(), {EX: 30});
    return price
  } catch (error) {
    throw new Error("Failed to fetch crypto data");
  }
}

export default getCrypto;
