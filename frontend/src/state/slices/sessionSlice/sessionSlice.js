import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sessions: [],
  loading: false,
  error: null,
};

export const getSessions = createAsyncThunk(
  "chat/getSessions",
  async (_, { getState, rejectWithValue }) => {
    const state = await getState();
    const loggedUser = state.auth.user;
    const token = loggedUser.access_token;

    console.log("About to fetch sessions getSessions");

    const response = await fetch("http://localhost:3001/api/chat/sessions", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("Response from getSessions: ", response);
      return rejectWithValue({
        error: "Fetching Sessions failed.",
      });
    }

    const data = await response.json();
    console.log("Response from getSessions: ", data);

    return data;
  }
);

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    listSessionHistory: (state, action) => {
      state.sessions = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        console.log("fullfilled getSession payload: ", action.payload.data);
        state.sessions = action.payload.data;
        state.loading = false;
        state.error = null; 
      })
      .addCase(getSessions.rejected, (state, action) => {
        // renaming destructured messageId to user_request_id
        console.log("error getSessions.rejected: ", action.payload);
        state.loading = false;
        state.error = action.payload?.error || "Unknown error";
      });
  },
});

export const { listSessionHistory } = sessionsSlice.actions;

export default sessionsSlice.reducer;
