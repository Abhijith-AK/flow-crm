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
        },
        setUserInfo: (state, action) => {
            state.name = action.payload.name !== undefined ? action.payload.name : state.name;
            state.email = action.payload.email !== undefined ? action.payload.email : state.email;
            state.password = action.payload.password !== undefined ? action.payload.password : state.password;
        }
    }
})

export const { nextStep, prevStep, setUserInfo } = registerSlice.actions

export default registerSlice.reducer