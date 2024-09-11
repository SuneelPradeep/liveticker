
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
};


const savedData = JSON.parse(localStorage.getItem("orderBook")) || initialState;

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState: savedData,
  reducers: {
    updateOrderBook: (state, action) => {
      
      const  rows  = action.payload;
      state.rows = rows;
      localStorage.setItem("orderBook", JSON.stringify(state));
    },
  },
});

export const { updateOrderBook } = orderBookSlice.actions;
export default orderBookSlice.reducer;
