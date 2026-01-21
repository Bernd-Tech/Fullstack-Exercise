import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice"
import chatReducer from "./slices/chatSlice/chatSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    // chat: chatReducer
  },
})

export default store;