import supabase from "../config/database/supabase.js"

export const insertNewChatSession = async (sessionId, userId, title) => {
    const { data, error } = await supabase
    .from('chat_sessions')
    .insert({id: sessionId,
        profile_id: userId,
        title: title
    })

    if (error) {
        console.error("Inserting new session unsuccessfull: ", error.message)
        return error;
    }
}