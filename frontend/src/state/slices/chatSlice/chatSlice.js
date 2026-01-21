import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    currentSessionId: null,
    messages: [],
    error: null
};

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (content, {getState}) => {
        try {
        const state = getState();
        const loggedUser = state.user;
        const { access_token } = loggedUser;
        const { id } = loggedUser.user;
        const currentSessionId = state.chat.currentSessionId;
        const messageId = uuidv4();

        console.log(`User ID: ${id}`);
        console.log(`Access token: ${access_token}`);
        console.log(`Messsage ID: ${messageId}`);

        const response = await fetch("http://localhost:3001/api/chat/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify({
                currentSessionId: currentSessionId,
                messageId: messageId,
                userId: id,
                role: "user",
                content: content
            })
        })

        const data = await response.json();

        console.log(`chat/sendMessage response: ${data}`)
        return data;

        } catch (error) {
            // Can't do state modifications in async thunk. State modifications is job of reducers
            // Have to throw error and n ot return error, so that rejected case in extra reducer gets called.
            throw new error;
        }

    }
)

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // startNewChat: (state, action) => {

        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendMessage.pending, () => {
            console.log("chat/sendMessage pending.")
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            console.log("chat/sendMessage fulfilled.")
            console.log(action.payload)
        })
        .addCase(sendMessage.rejected, () => {
            console.log("chat/sendMessage rejected.")
        })
    }
});


export const {startNewChat} = chatSlice.actions;
export default chatSlice.reducer;