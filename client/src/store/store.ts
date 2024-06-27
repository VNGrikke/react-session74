import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/listProductReducer";
import cartReducer from "./reducers/cartReducer";

const store:any = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
    },
});



export default store;
