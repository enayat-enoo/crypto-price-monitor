import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

interface Alert {
  coin: string;
  currency: string;
  condition: "above" | "below";
  target: number;
  currentPrice: number;
}

const PriceViewer: React.FC = () => {
  const [coin, setCoin] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [fetchedCoin, setFetchedCoin] = useState(coin);
  const [fetchedCurrency, setFetchedCurrency] = useState(currency);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_UR);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    //Listen for alert events
    socket.on("alert", (data: Alert) => {
      console.log("Alert received:", data);
      setAlerts((prev) => [...prev, data]);

      //Show toast notification
      toast.info(
        `${data.coin.toUpperCase()} alert: ${data.currentPrice} is ${
          data.condition
        } ${data.target}`,
        { autoClose: 5000 }
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchPrice = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/price`, {
        params: { coin, currency },
      });
      setPrice(res.data.price);
      setFetchedCoin(coin);
      setFetchedCurrency(currency);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2>Live Price Viewer</h2>
      <input
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
        placeholder="Coin"
      />
      <input
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        placeholder="Currency"
      />
      <button onClick={fetchPrice}>Fetch Price</button>

      {price && (
        <p>
          {fetchedCoin.toUpperCase()} in {fetchedCurrency}: {price}
        </p>
      )}

      <h3 className="mt-4">Real-time Alerts</h3>
      <ul>
        {alerts.map((a, i) => (
          <li key={i}>
            {a.coin.toUpperCase()} in {a.currency}: {a.currentPrice} (
            {a.condition} {a.target})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceViewer;
