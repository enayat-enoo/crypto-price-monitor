import { Request, Response } from "express";
import Alert from "../models/alertModel";

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { coinID, currency = "usd", targetPrice, condition } = req.body;

    if (!coinID || !targetPrice || !condition) {
      return res
        .status(400)
        .json({ error: "coinID, targetPrice and condition are required" });
    }

    const alert = new Alert({ coinID, currency, targetPrice, condition });
    await alert.save();

    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: "Failed to create alert" });
  }
};
