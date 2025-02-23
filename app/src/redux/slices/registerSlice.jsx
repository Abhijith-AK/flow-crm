import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    password: "",
    step: 1
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        nextStep: (state) => {
            if (state.step < 4) state.step += 1;
        },
        prevStep: (state) => {
            if (state.step > 1) state.step -= 1;
        }
    }
})

export const { nextStep, prevStep } = registerSlice.actions

export default registerSlice.reducer