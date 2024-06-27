import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../interfaces";
import { getItemProduct, updateItemProduct } from "../../services/list.service";

interface ProductState {
    products: ProductItem[];
    loading: boolean;
    error?: string;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: undefined,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItemProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getItemProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getItemProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateItemProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    },
});

export default productSlice.reducer;
