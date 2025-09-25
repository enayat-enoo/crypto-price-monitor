import React from "react";
import PriceViewer from "./components/PriceViewer";
import AlertForm from "./components/AlertForm";

const App: React.FC = () => {
  return (
    <div>
      <h1>Crypto Monitor Dashboard</h1>
      <PriceViewer />
      <AlertForm />
    </div>
  );
};

export default App;

