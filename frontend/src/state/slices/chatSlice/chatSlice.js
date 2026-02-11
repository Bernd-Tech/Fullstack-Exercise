import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentSessionId: null,
    messages: [],
    error: null
};

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({content, messageId, createdAt}, {getState, rejectWithValue}) => {
        console.log("content passed to sendMessage: ", content)
        
        const state = await getState();
        const loggedUser = state.auth.user;
        const token = loggedUser.access_token;
        const currentSessionId = state.chat.currentSessionId;

        const response = await fetch("http://localhost:3001/api/chat/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            // Security rule: Never use user ID from req body for authorization. Malicious user might attempt to get data from different user.
            body: JSON.stringify({
                messageId: messageId,
                role: "user",
                content: content,
                currentSessionId: currentSessionId,
                createdAt: createdAt
            })
        }); 

        // Have to check response before awaiting data
        if (!response.ok) {
            return rejectWithValue({error: "Fetching AI response failed.", messageId})
        }

        const data = await response.json();
        console.log(`chat/sendMessage response from async thunk:`, data);

        return data;
    }
)

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
                timestamp: new Date().toISOString()
            };

            state.messages.push(newMessage);
        }
        // startNewChat: (state, action) => {

        // }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(sendMessage.pending, (state, action) => {
        //     console.log("chat/sendMessage pending.")
        // })
        .addCase(sendMessage.fulfilled, (state, action) => {
            const {ai_response_id, ai_response, created_at, user_request_id, currentSessionId} = action.payload.message;

            const newAiResponse = {
                messageId: ai_response_id,
                content: ai_response,
                role: "assistant",        
                status: "fulfilled",
                timestamp: new Date(created_at).toISOString()
            }

            state.messages.push(newAiResponse);
            state.currentSessionId = currentSessionId;
            console.log("State sessionId after fulfilled aync request: ",state.currentSessionId);
            
            const prevUserRequest = state.messages.find(({messageId}) => messageId === user_request_id);
            prevUserRequest.status = "fulfilled";
        })
        .addCase(sendMessage.rejected, (state, action) => {
            // renaming destructured messageId to user_request_id
            const {error, messageId: user_request_id} = action.payload;
            console.log("chat/sendMessage rejected.");
            console.log("Full action object:", action);
            
            const failedAiResponse = {
                messageId: "",
                content: "",
                role: "assistant",        
                status: "rejected",
                error: error
            };

            state.messages.push(failedAiResponse);

            const prevUserRequest = state.messages.find(({messageId}) => messageId === user_request_id);
            prevUserRequest.status = "rejected";
        })
    }
});


export const {addUserMessage} = chatSlice.actions;
export default chatSlice.reducer;