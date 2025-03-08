import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLeadAPI } from "../../services/allAPI";


const initialState = {
    leads: null,
    loading: false,
    error: null
}

export const getLeads = createAsyncThunk(
    "employee/getLeads",
    async (crmId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await getAllLeadAPI(crmId, {
                "Authorization": `Bearer ${token}`
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.leads = action.payload;
            })
            .addCase(getLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default leadSlice.reducer