import express from "express";
const app = express();
import dotenv from "dotenv";
import { Router } from "express";
import connectToRedis from "./config/redis";
import connectToDb from "./config/db";
dotenv.config();

const PORT = process.env.PORT || 8000;

const REDIS_URL = process.env.REDIS_API || "redis://localhost:6379";
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/cryptomonitordb";


//MongoDB connection
connectToDb(MONGODB_URL)
.then(() => console.log("Database connected successfully"))
.catch((err) => {
  console.log("Database connection failed", err);
  process.exit(1);
})

//Redis connection
connectToRedis(REDIS_URL)
.then(() => console.log("Redis connected successfully"))
.catch((err) => {
  console.log("Redis connection failed", err);
  process.exit(1);
})


app.get("/", (req, res) => {
  res.send("Hello TypeScript Crypto Monitor!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
