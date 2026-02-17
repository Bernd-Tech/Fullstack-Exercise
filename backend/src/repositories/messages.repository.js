import supabase from "../config/database/supabase.js"

export const insertNewChatMessage = async (role, userId, sessionId, messageId, message, unixTimestamp, model) => {
    const {error} = await supabase
    .from('chat_messages')
    .insert({
        role: role,
        profile_id: userId,
        id: messageId,
        content: message,
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

export const getRecentMessages = async (sessionId, userId) => {
    const {data, error} = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('profile_id', userId)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(10)

    if (error) {
        return error;
    }

    console.log("last 10 chat messages: ", data)
    return data;
}
