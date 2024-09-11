
export const connectToBitfinex = (setData) => {
  const URL = import.meta.env.VITE_WEBSOCKET
  const ws = new WebSocket(URL)
  ws.onopen = () => {
    console.log("Connected to Bitfinex WebSocket");

    // Subscribe to the BTCUSD order book
    const msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      prec: "P0", // Precision level
      freq: "F0", // Real-time frequency
      len: 100,    // Number of price points
    });
    ws.send(msg);
  };
  

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data) && data[1] !== "hb") {
      
      const [channelId, [price, count, amount]] = data;

      if (count >= 0) {
        const totalPrice = price * Math.abs(amount); 
         setData((prevData) => ({
          ...prevData,
          rows: updateTableRows(prevData.rows, price, count, amount, totalPrice),
        }));
        
        
      }
    }
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket. Reconnecting...");
    setTimeout(() => connectToBitfinex(setData), 5000); // Reconnect after 1 second
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    ws.close();
  };
};


const updateTableRows = (rows = [], price, count, amount, totalPrice) => {
  const index = rows.findIndex((row) => row.price === price);

  if (index === -1 && count > 0) {
    return [...rows, { price, count, amount, totalPrice }];

  } else if (index !== -1 && count > 0) {
    const updatedRows = [...rows];
    updatedRows[index] = { price, count, amount, totalPrice };
    return updatedRows;
  } else if (index !== -1 && count === 0) {
    
    return rows.filter((row) => row.price !== price);
  }
   return rows;
};

