import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectRedis } from "./config/redis";
import connectToDb from "./config/db";
import { evaluateAlerts } from "./services/alertService";
import { startPolling } from "./services/fetcherService";

const PORT = process.env.PORT || 8000;
const REDIS_URL = process.env.REDIS_API || "redis://localhost:6379";
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/cryptomonitordb";

async function startServer() {
  try {
    await connectRedis(REDIS_URL); 
    console.log("Redis connected");

    await connectToDb(MONGODB_URL); 
    console.log("MongoDB connected");

    //Start background polling
    startPolling();
    evaluateAlerts();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
}

startServer();




