import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"
import setupReducer from "./slices/setupSlice"
import crmReducer from "./slices/crmSlice"
import employeeReducer from "./slices/employeeSlice"
import leadReducer from "./slices/leadSlice"
import taskReducer from "./slices/taskSlice"

export const crmStore = configureStore({
    reducer: {
        register: registerReducer,
        setup: setupReducer,
        crm: crmReducer,
        employee: employeeReducer,
        lead: leadReducer,
        task: taskReducer
    }
})