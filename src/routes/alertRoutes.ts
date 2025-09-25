import { Router } from "express";
import Alert from "../models/alertModel";

const router = Router();

// Create new alert
router.post("/", async (req, res) => {
  try {
    const { coinID, currency = "usd", targetPrice, condition } = req.body;

    if (!coinID || !targetPrice || !condition) {
      return res.status(400).json({ error: "coinID, targetPrice and condition are required" });
    }

    const alert = new Alert({ coinID, currency, targetPrice, condition });
    await alert.save();

    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: "Failed to create alert" });
  }
});

// Get all alerts
router.get("/", async (_req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

export default router;

