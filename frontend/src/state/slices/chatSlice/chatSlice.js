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
            throw rejectWithValue(error)
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
        .addCase(sendMessage.pending, () => {
            console.log("chat/sendMessage pending.")
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            const {ai_response_id, ai_response, created_at} = action.payload.message;

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
        })
        .addCase(sendMessage.rejected, (state, action) => {
            console.log("chat/sendMessage rejected.");
            // messageId is not included within error return yet
            // const prevUserMessageId = action.payload.messageId;
            // const prevUserInput = state.messages.find(({messageId}) => messageId === prevUserMessageId);
            // console.log("ID of previous user message", prevUserInput);

            console.log(`rejected payload: ${action.payload}`)
            
            const failedAiResponse = {
                messageId: "",
                content: "",
                role: "assistant",        
                status: "rejected",
                error: {...action.error}
            };

            console.log("Error:", action.error);
        })
    }
});


export const {addUserMessage} = chatSlice.actions;
export default chatSlice.reducer;