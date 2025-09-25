import Alert from "../models/alertModel";
import { getCryptoPrice } from "./fetcherService";

export const evaluateAlerts = async () => {
  const alerts = await Alert.find({ triggered: false });

  for (const alert of alerts) {
    const price = await getCryptoPrice(alert.coinID, alert.currency);

    if (
      (alert.condition === "above" && price > alert.targetPrice) ||
      (alert.condition === "below" && price < alert.targetPrice)
    ) {
      console.log(`Alert triggered for ${alert.coinID}: current price ${price} is ${alert.condition} ${alert.targetPrice}`);

      alert.triggered = true;
      await alert.save();
    }
  }
};
