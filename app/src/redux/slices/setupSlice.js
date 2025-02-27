import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    type: "",
    workflow: [],
    layout: "",
    theme: "",
    step: 1
}

const setupSlice = createSlice({
    name: "setup",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload !== undefined ? action.payload : state.name 
        },
        nextSetupStep: (state) => {
            if (state.step < 4) state.step += 1;
        },
        prevSetupStep: (state) => {
            if (state.step > 1) state.step -= 1;
        },
        setType: (state, action) => {
            state.type = action.payload
        },
        setUpWorkFlow: (state, action) => {
            state.workflow = action.payload
        },
        setLayoutTheme: (state, action) => {
            state.layout = action.payload.layout
            state.theme = action.payload.theme
        }
    }
})

export const { setName, setType, nextSetupStep, prevSetupStep, setUpWorkFlow, setLayoutTheme } = setupSlice.actions

export default setupSlice.reducer