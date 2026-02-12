import { v4 as uuidv4 } from 'uuid';
import generateAiResponse from "../config/openai/openai.mjs";
import { insertNewChatMessage } from '../repositories/messages.repository.js';
import { insertNewChatSession } from '../repositories/sessions.repository.js';
import { getRecentMessages } from '../repositories/messages.repository.js';

//Have to validate and sanitize post req before passing to controller -> With zod library?
const chatController = async (req, res) => {
    try {
    // To Do's: validate + sanitize message content
    console.log("Full user req: ", req.body, req.isNewSession)
    const {content, messageId, role, currentSessionId, createdAt} = req.body;
    const userInput = {role, content};
    const userId = req.user.id;
    const {isNewSession} = req;
    const title = "Super nice!";
    const aiResponseId = uuidv4();

    if (!content) {
        return res.status(400).json({error: "Invalid Request"});
    }

    if (isNewSession) {
        await insertNewChatSession(currentSessionId, userId, title);
    }

    await insertNewChatMessage(role, userId, currentSessionId, messageId, content, createdAt);
    
    const recentMessages = await getRecentMessages(currentSessionId, userId);
    const aiResponse = await generateAiResponse(recentMessages, userInput);

    if (!aiResponse) {
        return res.status(500).json({error: "AI response unsuccessfull"});
    }

    await insertNewChatMessage("assistant", userId, currentSessionId, aiResponseId, aiResponse.text, aiResponse.created_at, aiResponse.model);

    return res.status(201).json({
        success: true,
        message: {
            ai_response: aiResponse.text,
            ai_response_id: aiResponseId,
            created_at: aiResponse.created_at,
            user_request_id: messageId,
            currentSessionId: currentSessionId
        }
    })
    } catch (error) {
        console.log("ChatRoutes error: ", error.message);
        return res.status(400).json({error: error.message});
    }
};

export default chatController;