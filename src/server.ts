import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello TypeScript Crypto Monitor!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
