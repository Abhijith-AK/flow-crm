import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    crm: {}
}

const crmSlice = createSlice({
    name: "crm",
    initialState,
    reducers: {
        setCrm: (state, action) => {
            state.crm ? state.crm = action.payload : state.crm
        }
    }
})

export const { setCrm } = crmSlice.actions

export default crmSlice.reducer