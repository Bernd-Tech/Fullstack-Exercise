import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentSessionId: null,
    messages: [],
    error: null
};

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({content, messageId}, {getState}) => {
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
        })

        const data = await response.json();

        console.log(`chat/sendMessage response: ${data}`)
        return data;

        // } catch (error) {
        //     // Can't do state modifications in async thunk. State modifications is job of reducers
        //     // Have to throw error and n ot return error, so that rejected case in extra reducer gets called.
        //     throw error;
        // }

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
            const {ai_response_id, ai_response} = action.payload.message;

            const newAiResponse = {
                messageId: ai_response_id,
                content: ai_response,
                role: "assistant",        
                status: "fulfilled",
            }
            console.log("this is the payload: ", action.payload);
            console.log("this is ai response oject: ", newAiResponse);
            state.messages.push(newAiResponse);
        })
        .addCase(sendMessage.rejected, (state, action) => {
            console.log("chat/sendMessage rejected.");
            console.log("Error:", action.error.message);
        })
    }
});


export const {addUserMessage} = chatSlice.actions;
export default chatSlice.reducer;