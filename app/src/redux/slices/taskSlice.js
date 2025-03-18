import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTaskAPI } from "../../services/allAPI";


const initialState = {
    tasks: null,
    loading: false,
    error: null
}

export const getTasks = createAsyncThunk(
    "task/getTasks",
    async (crmId, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            const user = JSON.parse(sessionStorage.getItem("user"));
            const response = await getAllTaskAPI(crmId, {
                "Authorization": `Bearer ${token}`
            });
            if (user.role === "employee") return response.data.filter((value) => value.assignedTo._id === user._id)
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