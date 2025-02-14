import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import productReducer from "./products/productSlice"

const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer
    }
})

export default store;