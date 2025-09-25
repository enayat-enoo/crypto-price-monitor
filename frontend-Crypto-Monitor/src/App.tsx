import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PriceViewer from "../src/components/PriceViewer";
import AlertForm from "../src/components/AlertForm";

const App: React.FC = () => {
  return (
    <>
      <PriceViewer />
      <AlertForm />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default App;
