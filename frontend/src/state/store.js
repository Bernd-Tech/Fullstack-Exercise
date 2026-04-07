import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice/authSlice"
import chatReducer from "./slices/chatSlice/chatSlice"
import sessionsReducer from "./slices/sessionSlice/sessionSlice"
import { chatApi } from "./slices/chatSlice/chatApi";

const store = configureStore({
  // The reducer field is where I define the different slices of state in my application. Each key in this object corresponds to a slice of state, and the value is the reducer function that will manage that slice of state.
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    sessions: sessionsReducer,
    // Adds the chatApi reducer to the store, using the reducerPath defined in the chatApi configuration (= "chatApi").
    [chatApi.reducerPath]: chatApi.reducer,
  },
  // Adds the chatApi middleware to the store, which is necessary for handling caching, invalidation, polling, and other features of RTK Query.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
})

// setupListeners is a utility function provided by RTK Query that sets up listeners for refetching data on focus or reconnect. It takes the store's dispatch function as an argument, which it uses to dispatch actions when certain events occur (like the user refocusing the window or reconnecting to the internet).
setupListeners(store.dispatch);

export default store;