import supabase from "../config/database/supabase.js"

export const insertNewChatMessage = async (role, userId, sessionId, messageId, message, unixTimestamp, model) => {
    const {error} = await supabase
    .from('chat_messages')
    .insert({
        role: role,
        profile_id: userId,
        id: messageId,
        message_content: message,
        created_at: new Date(unixTimestamp),
        ai_model: model || null,
        session_id: sessionId
    })

    if (error) {
        console.error("Database connection failed: ", error.message)
        // return error instead of res.send/res.status because service functions don't have access to res. controller accesses req and res
        return error;
    }
}
