import { getSessionById } from "../../repositories/sessions.repository.js";

const verifySessionId = async (sessionId, userId) => {
    const { data, error } = await getSessionById(sessionId, userId);

    let sessionStatus;

    if (error) {
        sessionStatus = {
            status: 404,
            message: "Session ID not found."
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