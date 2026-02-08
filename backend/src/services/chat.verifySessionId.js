import supabase from "../config/database/supabase.js"

const verifySessionId = async (sessionId, userId) => {
    const { data } = await supabase
    .from('chat_sessions')
    .select('id, profile_id')
    .eq('id', sessionId)

    console.log("Fetched session data from supabase", data)

    if (!data) {
        console.log("Missing session data from supabase", data)
        return;
    }

    if (data && data[0].profile_id === userId) {
        console.log("Authorized session data from supabase", data)
        return data;
    } 
    else if (data && data[0].profile_id !== userId) {
        const error = [{
            status: 403,
            message: "Forbidden"
        }];
        return error;
    }
}

export default verifySessionId;