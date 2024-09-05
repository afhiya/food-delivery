import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Cart = {
  id?: number;
  userId: number;
  productId: number;
  quantity: number;
};

interface CartState {
  data: Cart[];
  message: string;
}

const initialState: CartState = {
  data: [],
  message: "",
};

export const getSliceCart = createAsyncThunk<Cart[], number>(
  "cart/getCart",
  async (id: number) => {
    const response = await fetch(`/api/cart?userId=${id}`);
    const data = await response.json();
    return data;
  }
);

export const addSliceCart = createAsyncThunk<Cart, Cart>(
  "cart/addCart",
  async (cartItem: Cart) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) {
      throw new Error("Failed to add cart");
    }
    const data = await response.json();
    return data;
  }
);

export const updateSliceCart = createAsyncThunk<Cart, Cart>(
  "cart/updateCart",
  async (cartItem: Cart) => {
    const response = await fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) {
      throw new Error("Failed to update cart");
    }
    const data = await response.json();
    return data;
  }
);

export const deleteSliceCart = createAsyncThunk<Cart, number>(
  "cart/deleteCart",
  async (id: number) => {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete cart");
    }
    const data = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSliceCart.pending, (state) => {})
      .addCase(
        getSliceCart.fulfilled,
        (state, action: PayloadAction<Cart[]>) => {
          state.data = action.payload;
          state.message = "";
        }
      )
      .addCase(getSliceCart.rejected, (state, action) => {
        state.data = [];
        state.message = action.error.message || "An error occurred";
      })
      .addCase(addSliceCart.pending, (state) => {})
      .addCase(addSliceCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.data = [...state.data, action.payload];
        state.message = "Successfully added to cart";
      })
      .addCase(addSliceCart.rejected, (state, action) => {
        state.data = [];
        state.message = action.error.message || "An error occurred";
      })
      .addCase(updateSliceCart.pending, (state) => {})
      .addCase(
        updateSliceCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          const filter = state.data.findIndex(
            (items) => items.id == action.payload.id
          );
          state.data[filter].quantity = action.payload.quantity;
          state.message = "Successfully added to cart";
        }
      )
      .addCase(updateSliceCart.rejected, (state, action) => {
        state.message = action.error.message || "An error occurred";
      })
      .addCase(deleteSliceCart.pending, (state) => {})
      .addCase(deleteSliceCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.data = state.data.filter((item) => item.id !== action.payload.id);
        state.message = "Successfully added to cart";
      })
      .addCase(deleteSliceCart.rejected, (state, action) => {
        state.message = action.error.message || "An error occurred";
      })
  },
});

export default cartSlice.reducer;
