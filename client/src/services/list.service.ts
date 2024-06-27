import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductItem } from "../interfaces/index";
import axios from "axios";

export const getItemProduct: any = createAsyncThunk<ProductItem[]>(
    "product/getItemProduct",
    async () => {
        const response = await axios.get("http://localhost:8080/products");
        return response.data;
    }
);

export const addItemProduct: any = createAsyncThunk<ProductItem, ProductItem>(
    "product/addItemProduct",
    async (product: ProductItem) => {
        const response = await axios.post("http://localhost:8080/products", product);
        return response.data;
    }
)

export const deleteItemProduct: any = createAsyncThunk<number, number>(
    "product/deleteItemProduct",
    async (id: number) => {
        await axios.delete(`http://localhost:8080/products/${id}`);
        return id;
    }
)

export const updateItemProduct: any = createAsyncThunk<ProductItem, ProductItem>(
    "product/updateItemProduct",
    async (product: ProductItem) => {
        const response = await axios.put(`http://localhost:8080/products/${product.id}`, product);
        return response.data;
    }
)
