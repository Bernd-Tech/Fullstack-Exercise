import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice"
import chatReducer from "./slices/chatSlice/chatSlice"
import sessionsReducer from "./slices/sessionSlice/sessionSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    sessions: sessionsReducer
  },
})

export default store;