import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../interfaces";
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from "../../services/cart.service";

interface CartState {
    items: CartItem[];
    loading: boolean;
    error?: string;
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: undefined,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addCartItem.fulfilled, (state, action: any) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(updateCartItem.fulfilled, (state, action: any) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCartItem.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export default cartSlice.reducer;