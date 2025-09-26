import { Request, Response } from "express";
import { getCryptoPrice } from "../services/fetcherService";

export const fetchPrice = async (req: Request, res: Response) => {
  const coin = (req.query.coin as string).toLowerCase();
  const currency = (req.query.currency as string).toLowerCase() || "usd";

  if (!coin) return res.status(400).json({ error: "Coin ID is required" });

  try {
    const price = await getCryptoPrice(coin, currency);
    res.json({ coin, currency, price });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
