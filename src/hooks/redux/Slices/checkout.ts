import { Payload } from "@prisma/client/runtime/library";
import { createSlice } from "@reduxjs/toolkit";

type Checkout = {
  id?: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
  };
};

interface CheckoutState {
  data: Checkout[];
}

const initialState :CheckoutState = {
  data : []
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers:{
    addCheckout: (state, action: Payload<Checkout[]>) => {
      state.data = [...state.data, action.payload];
    },
    updateCheckout: (state, action:Payload<{id: number,quantity: number} | any>) => {
        const selection = state.data.find((item) => item.id === action.payload.id);
        if(selection){
          selection.quantity = action.payload.quantity
        }
    },
    deleteCheckout(state, action:Payload<Checkout[]>) {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    }
  }
})

export const { addCheckout, updateCheckout, deleteCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer