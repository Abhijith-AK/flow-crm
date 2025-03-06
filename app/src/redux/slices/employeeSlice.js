import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEmployeeAPI } from "../../services/allAPI";

const initialState = {
    employees: [],
    loading: false,
    error: null
}

export const getEmployees = createAsyncThunk(
    "employee/getEmployees",
    async (crmId, { rejectWithValue }) => {
        try {
            const response = await getAllEmployeeAPI(crmId);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default employeeSlice.reducer