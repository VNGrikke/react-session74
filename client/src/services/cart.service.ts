import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "../interfaces/index";
import axios from "axios";

export const getCartItems:any = createAsyncThunk<CartItem[]>(
    "cart/getCartItems",
    async () => {
        const response = await axios.get("http://localhost:8080/carts");
        return response.data;
    }
);

export const addCartItem:any = createAsyncThunk<CartItem, CartItem, { state: any }>(
    "cart/addCartItem",
    async (cartItem, { getState }) => {
        const state = getState();
        const existingCartItem = state.cart.items.find((item: CartItem) => item.id === cartItem.id);

        if (existingCartItem) {
            const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
            const response = await axios.put(`http://localhost:8080/carts/${updatedItem.id}`, updatedItem);
            return response.data;
        } else {
            const response = await axios.post("http://localhost:8080/carts", { ...cartItem, quantity: 1 });
            return response.data;
        }
    }
);

export const updateCartItem:any = createAsyncThunk<CartItem, CartItem>(
    "cart/updateCartItem",
    async (cartItem) => {
        const response = await axios.put(`http://localhost:8080/carts/${cartItem.id}`, cartItem);
        return response.data;
    }
);

export const deleteCartItem:any = createAsyncThunk<number, number>(
    "cart/deleteCartItem",
    async (id) => {
        await axios.delete(`http://localhost:8080/carts/${id}`);
        return id;
    }
);