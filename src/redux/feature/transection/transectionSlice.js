import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import transectionService from "./transectionService";

// Initial state
const initialState = {
  transections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all transections
export const getAllTransections = createAsyncThunk(
  "transection/getAllTransections",
  async ({ userId, token, message }, { rejectWithValue }) => {
    try {
      const res = await transectionService.getAllTransections(userId, token);
      return res.data;
    } catch (error) {
      message.error(error.response.data.message);
      const msg =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return rejectWithValue(msg);
    }
  }
);

// Add transection
export const addTransection = createAsyncThunk(
  "transection/addTransection",
  async ({ transectionData, token, message }, { rejectWithValue }) => {
    try {
      const res = await transectionService.addTransection(
        transectionData,
        token
      );
      message.success(res.data.message);
      return res.data;
    } catch (error) {
      message.error(error.response.data.message);
      const msg =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return rejectWithValue(msg);
    }
  }
);

// Delete transection
export const deleteTransection = createAsyncThunk(
  "transection/deleteTransection",
  async ({ id, token, message }, { rejectWithValue }) => {
    try {
      const res = await transectionService.deleteTransection(id, token);
      message.success(res.data.message);
      return res.data;
    } catch (error) {
      message.error(error.response.data.message);
      const msg =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return rejectWithValue(msg);
    }
  }
);

const transectionSlice = createSlice({
  name: "transection",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get all transections
    builder.addCase(getAllTransections.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTransections.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.transections = payload;
    });
    builder.addCase(getAllTransections.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Add transection
    builder.addCase(addTransection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTransection.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.transections.push(payload);
    });
    builder.addCase(addTransection.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // Delete transection
    builder.addCase(deleteTransection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTransection.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.transections = state.transections.filter(
        (transection) => transection._id !== payload._id
      );
    });
    builder.addCase(deleteTransection.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
  },
});

// Actions
export const { clearState } = transectionSlice.actions;

// Reducer
export default transectionSlice.reducer;
