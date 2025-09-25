import Alert from "../models/alertModel";
import { getCryptoPrice } from "./fetcherService";

export const evaluateAlerts = async () => {
  const alerts = await Alert.find({ triggered: false });

  for (const alert of alerts) {
    const price = await getCryptoPrice(alert.coinID, alert.currency);

    if (
      (alert.condition === "above" && price > alert.threshold) ||
      (alert.condition === "below" && price < alert.threshold)
    ) {
      console.log(`Alert triggered for ${alert.coinID}: current price ${price} is ${alert.condition} ${alert.threshold}`);

      alert.triggered = true;
      await alert.save();
    }
  }
};
