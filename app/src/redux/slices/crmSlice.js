import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCRMAPI } from "../../services/allAPI";

const initialState = {
    crm: {},
    crms: null,
    loading: null,
    error: null
}

export const getAllCrm = createAsyncThunk(
    "crm/getAllCrm",
    async (_, { getState, rejectWithValue }) => {
        const { crms } = getState().crm; // get existing state 
        if (crms) return crms; // If already available, return existing data
        try {
            const token = sessionStorage.getItem("token");
            const response = await getAllCRMAPI({
                "Authorization" : `Bearer ${token}`
            })
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)

const crmSlice = createSlice({
    name: "crm",
    initialState,
    reducers: {
        setCrm: (state, action) => {
            state.crm ? state.crm = action.payload : state.crm
        },
        resetCrms: (state) => { state.crms = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCrm.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getAllCrm.fulfilled, (state, action) => {
                state.loading = false;
                state.crms = action.payload;
            })
            .addCase(getAllCrm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { setCrm, resetCrms } = crmSlice.actions

export default crmSlice.reducer