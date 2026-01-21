import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialChatState = {
    currentSessionId: null,
    messages: [],
    error: null
};

const chatSlice = createSlice({
    name: "chat",
    initialChatState,
    reducers: {
        startNewChat: (state, action) => {

        }
    },
    extraReducers: (builder) => {

    }
});

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (content, {getState}) => {
        try {
        const state = getState();
        const user = state.user;
        const token = user.access_token;
        const userId = user.user.id;

        const response = await fetch("/api/chat/messages", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId: userId,
                role: "user",
                content: content,
            }
        })

        return response;
        } catch (error) {

        }

    }
)


export const {startNewChat} = chatSlice.actions;
export default chatSlice.reducer;