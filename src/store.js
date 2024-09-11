import { configureStore } from "@reduxjs/toolkit";
import orderBookReducer from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});
