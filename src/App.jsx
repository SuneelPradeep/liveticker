
import React, { useEffect, useState } from "react";
import OrderBookControls from "./components/orderBookControls";

const App = () => {

  return (
    <div className="min-h-screen w-full text-white flex  justify-center items-center">
      <OrderBookControls />
    </div>
  );
};

export default App;

