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

export const getSessionById = async (sessionId, userId) => {
    const { data, error } = await supabase
    .from('chat_sessions')
    .select('id, profile_id')
    .eq('id', sessionId)
    .eq('profile_id', userId)
    .single()

    if (error) {
        console.error("Failed getting Session from DB: ", error)
        return {data: null, error};
    }

    console.log("Fetched session from DB: ", data)
    return {data, error: null};
}