import { Router } from "express";
import Alert from "../models/alertModel";
import { createAlert } from "../controllers/alertController";

const router = Router();

router.post("/", createAlert);

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
