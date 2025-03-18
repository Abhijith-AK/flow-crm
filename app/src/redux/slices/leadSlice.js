import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLeadAPI } from "../../services/allAPI";

const initialState = {
    leads: null,
    loading: false,
    error: null
}

export const getLeads = createAsyncThunk(
    "lead/getLeads",
    async (crmId, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            const user = JSON.parse(sessionStorage.getItem("user"));
            const response = await getAllLeadAPI(crmId, {
                "Authorization": `Bearer ${token}`
            });
            if(user.role === "employee") return response.data.filter((value) => value.assignedTo._id === user._id)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {
        setEmployeeLeads: (state, action) => {
            const filteredData = state.leads.filter((lead) => lead.assignedTo === action.payload)
            state.leads = state.leads?.filter((lead) => lead.assignedTo === action.payload)
            console.log(filteredData)
        }
    },
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

export const { setEmployeeLeads } = leadSlice.actions

export default leadSlice.reducer