import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  // reducerPath is the key in the store where the API state will be stored. Should be unique across your application.
  reducerPath: "chatApi",
  // baseQuery is the function that will be used to make the actual API calls.
  // fetchBaseQuery is a utility function that provides a simple way to define a base URL and default headers for API requests.
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/chat",
    prepareHeaders: (Headers, { getState }) => {
      const state = getState();
      const loggedUser = state.auth.user;

      if (loggedUser && loggedUser.access_token) {
        Headers.set("Authorization", `Bearer ${loggedUser.access_token}`);
      }

      return Headers;
    },
  }),
  // refetchOnFocus: true,
  endpoints: (builder) => ({
    getSessions: builder.query({ query: () => "/sessions" }),
    getSessionMessages: builder.query({
      query: (sessionId) => `/sessions/${sessionId}/messages`,
      providesTags: (result, error, sessionId) => [
        { type: "SessionMessages", id: sessionId },
      ],
    }),
  }),
});

// The createApi function generates a set of React hooks for each endpoint defined in the endpoints object.
export const {
  useGetSessionsQuery,
  useLazyGetSessionsQuery,
  useGetSessionMessagesQuery,
} = chatApi;
