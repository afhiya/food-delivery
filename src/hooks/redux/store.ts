import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/carts"
import checkoutReducer from "./Slices/checkout";

export const store = configureStore({
    reducer: {
      cart: cartReducer,
      checkout: checkoutReducer
    }
  })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>