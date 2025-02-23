import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"

export const crmStore = configureStore({
    reducer: {
        register: registerReducer,
    }
})