import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllNoteAPI } from "../../services/allAPI";


const initialState = {
    notes: null,
    loading: false,
    error: null
}

export const getNotes = createAsyncThunk(
    "note/getNotes",
    async ({ crmId, leadId }, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await getAllNoteAPI(crmId, leadId, {
                "Authorization": `Bearer ${token}`
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default noteSlice.reducer