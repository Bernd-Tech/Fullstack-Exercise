import supabase from "../config/database/supabase.js";

const newChatInsert = async (role, userId, messageId, message, model) => {
    const {error} = await supabase
    .from('chat_messages')
    .insert({
        role: role,
        profile_id: userId,
        id: messageId,
        // Zwischenlösung für session Id, have to extract session id from database and assign it to session_id
        // session_id: Math.floor(Math.random() * 100) + 1,
        message_content: message,
        created_at: new Date(),
        ai_model: model || null
    })

    if (error) {
        // throw new error instead of res.send/res.status because service function don't have access to res. controller accesses req and res
        throw new Error(`Database connection failed: ${error.message}`)
    }
}

export default newChatInsert;