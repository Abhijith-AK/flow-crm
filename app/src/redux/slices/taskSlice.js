import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTaskAPI } from "../../services/allAPI";


const initialState = {
    tasks: null,
    loading: false,
    error: null
}

export const getTasks = createAsyncThunk(
    "employee/getTasks",
    async (crmId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await getAllTaskAPI(crmId, {
                "Authorization": `Bearer ${token}`
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default taskSlice.reducer