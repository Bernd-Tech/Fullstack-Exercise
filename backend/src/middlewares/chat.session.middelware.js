import verifySessionId from "../services/chat.Services/verifySessionId.js";
import { v4 as uuidv4 } from 'uuid';

const sessionMiddleware = async (req, res, next) => {
    const {currentSessionId} = req.body;
    const userId = req.user.id;
    const sessionStatus = await verifySessionId(currentSessionId, userId);
    console.log("result of function call verifySession: ", sessionStatus)


    if (sessionStatus.status === 403) {
        return res.status(403).json({error: sessionStatus.message});
    }

    if (sessionStatus.status === 404) {
        console.log("New session needs to be inserted");
        const newSessionId = uuidv4();
        req.body.currentSessionId = newSessionId;
        req.isNewSession = true;

        next();
    } else if (sessionStatus.status === 200) {
        console.log("Session already exists.");
        req.isNewSession = false;

        next();
   }
}

export default sessionMiddleware;