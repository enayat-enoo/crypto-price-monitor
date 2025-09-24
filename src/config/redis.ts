import { createClient } from "redis";

async function connectToRedis(url: string) {
    const redisClient = createClient({ url });
    await redisClient.connect();
    return redisClient;
}

export default connectToRedis;