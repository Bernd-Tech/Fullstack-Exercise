import verifySessionId from "../services/chat.verifySessionId.js";
import { v4 as uuidv4 } from 'uuid';

const sessionMiddleware = async (req, res, next) => {
    // const {userId, currentSessionId} = req.body;
    const userId = "6684b1f4-8e88-4f0e-b516-2ee2f1f5971c"
    const sessionId = "0baf8b4d-85b5-42fd-a3cb-f8044c4bfc3e"
    const [data, error] = await verifySessionId(sessionId, userId);

    if (error) {
        return res.status(403).json(error[0].message);
    }

    if (!data) {
        console.log("New session needs to be inserted");
        const newSessionId = uuidv4();
        req.body.currentSessionId = newSessionId;
        req.isNewSession = true;

        next();
    } else {
        console.log("Session already exists: ", data);
        req.isNewSession = false;

        next();
   }
}

export default sessionMiddleware;