import Alert from "../models/alertModel";
import { getRedisClient } from "../config/redis";



export const evaluateAlerts = async () => {
  const redis = getRedisClient();
  // Find all alerts that have not been triggered
  const alerts = await Alert.find({ triggered: false });

  for (const alert of alerts) {
    // Get the cached price directly from Redis
    const cacheKey = `price:${alert.coinID}:${alert.currency}`;
    const cached = await redis.get(cacheKey);

    if (!cached) {
      console.log(`[Alert] No cached price for ${alert.coinID}, skipping`);
      continue;
    }

    const price = parseFloat(cached);

    // Check if condition is met
    if (
      (alert.condition === "above" && price > alert.targetPrice) ||
      (alert.condition === "below" && price < alert.targetPrice)
    ) {
      console.log(
        `[ALERT TRIGGERED] ${alert.coinID}: current price ${price} is ${alert.condition} ${alert.targetPrice}`
      );

      // Mark the alert as triggered
      alert.triggered = true;
      await alert.save();

      // Here we can integrate real notification system later
      // e.g., send email, WebSocket event, push notification
    }
  }
};
