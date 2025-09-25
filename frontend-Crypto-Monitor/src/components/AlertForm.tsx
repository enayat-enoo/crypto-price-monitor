import React, { useState } from "react";
import axios from "axios";

const AlertForm: React.FC = () => {
  const [coinID, setCoin] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("above");
  const [message, setMessage] = useState("");

  const createAlert = async () => {
    try {
      await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/alerts`, {
        coinID,
        currency,
        targetPrice: Number(targetPrice),
        condition,
      });
      setMessage("Alert created successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create alert");
    }
  };

  return (
    <div className="p-4">
      <h2>Create Alert</h2>
      <input
        value={coinID}
        onChange={(e) => setCoin(e.target.value)}
        placeholder="Coin"
      />
      <input
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        placeholder="Currency"
      />
      <input
        value={targetPrice}
        onChange={(e) => setTargetPrice(e.target.value)}
        placeholder="Target Price"
      />
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value="above">Above</option>
        <option value="below">Below</option>
      </select>
      <button onClick={createAlert}>Set Alert</button>
      <p>{message}</p>
    </div>
  );
};

export default AlertForm;
