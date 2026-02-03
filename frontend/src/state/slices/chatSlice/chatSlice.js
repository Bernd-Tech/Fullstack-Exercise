import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentSessionId: null,
    messages: [],
    error: null
};

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({content, messageId}, {getState, rejectWithValue}) => {
        console.log("content passed to sendMessage: ", content)
        
        const state = await getState();
        const loggedUser = state.auth.user;
        const token = loggedUser.access_token;
        const userId = loggedUser.user.id;
        // const currentSessionId = state.chat.currentSessionId;
        

        const response = await fetch("http://localhost:3001/api/chat/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                // currentSessionId: currentSessionId,
                messageId: messageId,
                userId: userId,
                role: "user",
                content: content
            })
        });

        const data = await response.json();

        console.log(`chat/sendMessage response from async thunk:`, data);

        if (data.error) {
            const {error} = data;
            throw rejectWithValue({error, messageId})
        }

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
            const {ai_response_id, ai_response, created_at, user_request_id} = action.payload.message;

            const newAiResponse = {
                messageId: ai_response_id,
                content: ai_response,
                role: "assistant",        
                status: "fulfilled",
                timestamp: new Date(created_at).toISOString()
            }
            console.log("this is the payload: ", action.payload);
            console.log("this is ai response object: ", newAiResponse);
            state.messages.push(newAiResponse);
            
            const prevUserRequest = state.messages.find(({messageId}) => messageId === user_request_id);
            prevUserRequest.status = "fulfilled";
        })
        .addCase(sendMessage.rejected, (state, action) => {
            console.log("chat/sendMessage rejected.");

            console.log("rejected payload: ", action.payload, action.error, action.messageId)
            
            const failedAiResponse = {
                messageId: "",
                content: "",
                role: "assistant",        
                status: "rejected",
                error: {...action.error}
            };

            console.log("Error:", action.error);
            state.messages.push(failedAiResponse);

            const prevUserRequest = state.messages.find(({messageId}) => messageId === action.messageId);
            prevUserRequest.status = "rejected";
        })
    }
});


export const {addUserMessage} = chatSlice.actions;
export default chatSlice.reducer;