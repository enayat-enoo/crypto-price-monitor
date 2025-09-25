import React, { useState } from "react";
import axios from "axios";

const PriceViewer: React.FC = () => {
  const [coin, setCoin] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.REACT_APP_API_URL}/api/price`,
        {
          params: { coin, currency },
        }
      );
      setPrice(res.data.price);
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
          {coin} in {currency}: {price}
        </p>
      )}
    </div>
  );
};

export default PriceViewer;
