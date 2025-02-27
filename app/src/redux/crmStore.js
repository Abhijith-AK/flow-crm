import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"
import setupReducer from "./slices/setupSlice"

export const crmStore = configureStore({
    reducer: {
        register: registerReducer,
        setup: setupReducer
    }
})