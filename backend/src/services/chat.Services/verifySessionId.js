import supabase from "../../config/database/supabase.js"

const verifySessionId = async (sessionId, userId) => {
    const { data } = await supabase
    .from('chat_sessions')
    .select('id, profile_id')
    .eq('id', sessionId)
    .single()

    let sessionStatus;

    console.log("Fetched session data from supabase", data)

    if (!data || data.length === 0) {
        sessionStatus = {
            status: 404,
            message: "Session ID does not exist."
        }

        return sessionStatus;
    }
    else if (data && data.profile_id === userId) {
        sessionStatus = {
            status: 200,
            message: "Session ID exists."
        }
        console.log("Authorized session data from supabase.", data)

        return sessionStatus;
    } 
    else if (data && data.profile_id !== userId) {
        sessionStatus = {
            status: 403,
            message: "Forbidden"
        };
        
        return sessionStatus;
    }
}

export default verifySessionId;