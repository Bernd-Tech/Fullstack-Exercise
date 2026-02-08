import { v4 as uuidv4 } from 'uuid';
import generateAiResponse from "../config/openai/openai.mjs";
import newChatInsert from "../services/chat.insert.js";

//Have to validate and sanitize post req before passing to controller -> With zod library?
const chatController = async (req, res) => {
    try {
    // To Do's: validate + sanitize message content
    console.log("Full user req: ", req.body, req.isNewSession)
    const {content, messageId, role, currentSessionId} = req.body;
    const userId = req.user.id;
    const aiResponseId = uuidv4();

    if (!content) {
        return res.status(400).json({error: "Invalid Request"});
    }

    await newChatInsert(role, userId, messageId, content)
    console.log("user message: ", content)

    const aiResponse = await generateAiResponse(content);
    console.log("Assistant response: ", aiResponse.text);

    if (!aiResponse) {
        return res.status(500).json({error: "AI response unsuccessfull"});
    }

    await newChatInsert("assistant", userId, aiResponseId, aiResponse.text, aiResponse.model, aiResponse.created_at);

    return res.status(201).json({
        success: true,
        message: {
            ai_response: aiResponse.text,
            ai_response_id: aiResponseId,
            created_at: aiResponse.created_at,
            user_request_id: messageId,
        }
    })
    } catch (error) {
        console.log("ChatRoutes error:", error.message);
        return res.status(400).json({error: error.message});
    }
};

export default chatController;