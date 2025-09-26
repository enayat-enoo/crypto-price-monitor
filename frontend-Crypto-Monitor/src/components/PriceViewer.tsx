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

// Predefined popular coins
const popularCoins = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "solana", symbol: "sol", name: "Solana" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin" },
  { id: "cardano", symbol: "ada", name: "Cardano" },
  { id: "ripple", symbol: "xrp", name: "XRP" },
];

const popularCurrencies = [
  { code: "usd", name: "US Dollar" },
  { code: "inr", name: "Indian Rupee" },
  { code: "eur", name: "Euro" },
  { code: "gbp", name: "British Pound" },
  { code: "jpy", name: "Japanese Yen" },
];

const PriceViewer: React.FC = () => {
  const [coin, setCoin] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [fetchedCoin, setFetchedCoin] = useState(coin);
  const [fetchedCurrency, setFetchedCurrency] = useState(currency);
  const [error, setError] = useState<string | null>(null);

  // Socket for real-time alerts
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);
    socket.on("alert", (data: Alert) => {
      setAlerts((prev) => [...prev, data]);
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

  // Fetch price API
  const fetchPrice = async () => {
    try {
      setError(null);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/price`, {
        params: { coin, currency },
      });
      setPrice(res.data.price);
      setFetchedCoin(coin);
      setFetchedCurrency(currency);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch price");
      setPrice(null);
    }
  };

  return (
    <div>
      <h2>Live Price Viewer</h2>

      <label>Select Coin:</label>
      <select
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
      >
        {popularCoins.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.symbol.toUpperCase()})
          </option>
        ))}
      </select>

      <label>Select Currency:</label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {popularCurrencies.map((cur) => (
          <option key={cur.code} value={cur.code}>
            {cur.name} ({cur.code.toUpperCase()})
          </option>
        ))}
      </select>

      <button
        onClick={fetchPrice}
      >
        Fetch Price
      </button>

      {error && <p>{error}</p>}
      {price && (
        <p className="mt-4">
          {fetchedCoin.toUpperCase()} in {fetchedCurrency.toUpperCase()}:{" "}
          <span>{price}</span>
        </p>
      )}

      <h3>Real-time Alerts</h3>
      <ul>
        {alerts.map((a, i) => (
          <li key={i}>
            {a.coin.toUpperCase()} in {a.currency.toUpperCase()}:{" "}
            {a.currentPrice} ({a.condition} {a.target})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceViewer;
