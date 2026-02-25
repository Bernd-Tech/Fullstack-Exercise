import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentSessionId: null,
  messages: [],
  loadingStage: "",
  error: null,
};

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { content, messageId, aiResponseId, createdAt },
    { getState, rejectWithValue, dispatch }
  ) => {
    console.log("content passed to sendMessage: ", content);

    const state = await getState();
    const loggedUser = state.auth.user;
    const token = loggedUser.access_token;
    const currentSessionId = state.chat.currentSessionId;

    const response = await fetch("http://localhost:3001/api/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // Security rule: Never use user ID from req body for authorization. Malicious user might attempt to get data from different user.
      body: JSON.stringify({
        messageId: messageId,
        role: "user",
        content: content,
        currentSessionId: currentSessionId,
        createdAt: createdAt,
        aiResponseId: aiResponseId,
      }),
    });

    // Have to check response before awaiting data
    if (!response.ok) {
      return rejectWithValue({
        error: "Fetching AI response failed.",
        messageId
      });
    }

    console.log("Fetched Response: ", response)
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // console.log("coded streamed value: ", value)
      buffer += decoder.decode(value, { stream: true });
      // console.log("decoded values in buffer: ", buffer)

      const parts = buffer.split("\n\n");
      buffer = parts.pop();

      for (const chunk of parts) {
        let eventName = "message";
        let data = "";

        for (const line of chunk.split("\n")) {
          if (line.startsWith("event:"))
            eventName = line.replace("event:", "").trim();

          if (line.startsWith("data:"))
            data += line.replace("data:", "").trim();
        }

        const parsed = JSON.parse(data);

        switch (eventName) {
          case "responseToken":
            dispatch(addTokensToStream({aiResponseId, parsed}));
            break;

          case "loadingStage":
            dispatch(setLoadingStage(parsed.stage));
            break;

          case "done":
            dispatch(finishMessage({aiResponseId, messageId}));
            break;

          // case "error":
          //   dispatch(setError(parsed.message));
          //   break;
        }
      }
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      const newMessage = {
        messageId: action.payload.messageId,
        content: action.payload.content,
        role: "user",
        status: "pending",
        timestamp: action.payload.createdAt,
      };

      state.messages.push(newMessage);
    },
    // Creating a placeholder in messages array for ai token stream
    startResponseStream: (state, action) => {
      const newAiResponse = {
        messageId: action.payload.aiResponseId,
        content: "",
        role: "assistant",
        status: "pending",
        error: null,
      };

      state.messages.push(newAiResponse);
    },
    addTokensToStream: (state, action) => {
      const { aiResponseId, parsed } = action.payload;

      const streamPlaceholder = state.messages.find(
        (message) => message.messageId === aiResponseId
      );
      streamPlaceholder.content += parsed;
    },
    finishMessage: (state, action) => {
      const {aiResponseId, messageId} = action.payload;
      const aiMsg = state.messages.find(message => message.messageId === aiResponseId);
      if (aiMsg) {
        aiMsg.status = "fulfilled";
        aiMsg.timestamp = Date.now();
      }

      const userMsg = state.messages.find(message => message.messageId === messageId);
      if (userMsg) userMsg.status = "fulfilled";
  }, 
  setLoadingStage: (state, action) => {
    const currentStage = action.payload;
    state.loadingStage = currentStage;
  }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(sendMessage.fulfilled, (state, action) => {
      //   const {
      //     ai_response_id,
      //     ai_response,
      //     created_at,
      //     user_request_id,
      //     currentSessionId,
      //   } = action.payload.message;

      //   const newAiResponse = {
      //     messageId: ai_response_id,
      //     content: ai_response,
      //     role: "assistant",
      //     status: "fulfilled",
      //     timestamp: new Date(created_at).toISOString(),
      //   };

      //   state.messages.push(newAiResponse);
      //   state.currentSessionId = currentSessionId;
      //   console.log(
      //     "State sessionId after fulfilled aync request: ",
      //     state.currentSessionId
      //   );

      //   const prevUserRequest = state.messages.find(
      //     ({ messageId }) => messageId === user_request_id
      //   );
      //   prevUserRequest.status = "fulfilled";
      // })
      .addCase(sendMessage.rejected, (state, action) => {
        // renaming destructured messageId to user_request_id
        const {
          error,
          messageId: user_request_id,
          aiResponseId,
        } = action.payload;
        console.log("chat/sendMessage rejected.");
        console.log("Full action object:", action);

        const failedAiResponse = state.messages.find(
          (message) => message.aiResponseId === aiResponseId
        );
        failedAiResponse.status = "unsuccessfull";
        failedAiResponse.error = error;

        const prevUserRequest = state.messages.find(
          ({ messageId }) => messageId === user_request_id
        );
        prevUserRequest.status = "rejected";
      });
  },
});

export const { 
  addUserMessage, 
  startResponseStream, 
  addTokensToStream, 
  finishMessage, 
  setLoadingStage 
} = chatSlice.actions;

export default chatSlice.reducer;
