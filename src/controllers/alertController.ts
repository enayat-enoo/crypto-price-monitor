import { Request, Response } from "express";
import Alert from "../models/alertModel";

export const createAlert = async (req: Request, res: Response) => {
  const { coinID, currency, targetPrice, condition } = req.body;

  if (!coinID || !targetPrice || !condition)
    return res
      .status(400)
      .json({ error: "coinID, targetPrice, and condition are required" });

  try {
    const alert = await Alert.create({
      coinID,
      currency,
      targetPrice,
      condition,
    });
    res.status(201).json(alert);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
