import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import generateAiResponse from "../config/openai/openai.mjs";
import newChatInsert from "../services/chat.insert.js";

const chatRouter = Router();

//Have to validate and sanitize post req before passing to controller -> With zod library?
chatRouter.post("/messages", async (req, res) => {
    try {
    // To Do's: extract message content and user id from req
    // To Do's: validate message content
    // store message in database with role of "user"
    // call openAI to generate ai response
    // store ai response in db with role of "assistant"
    // send response to client
    console.log("Full user req: ", req.body)
    const {content, messageId, role} = req.body;
    const userId = req.user.id;
    const aiResponseId = uuidv4();

    if (!content) {
        return res.status(400).json({error: "Invalid Request"});
    }

    await newChatInsert(role, userId, messageId, content)
    console.log("user message: ", content)

    const aiResponse = await generateAiResponse(content);
    console.log("Assistant response: ", aiResponse.output_text);

    if (!aiResponse) {
        return res.status(500).json({error: "AI response unsuccessfull"});
    }

    await newChatInsert("assistant", userId, aiResponseId, aiResponse.output_text, aiResponse.model);

    return res.status(201).json({
        success: true,
        message: {
            ai_response: aiResponse.output_text,
            ai_response_id: aiResponseId
        }
    })
    } catch (error) {
        console.log("ChatRoutes error:", error.message);
        return res.status(400).json({error: "Invalid Request"});
    }
})

export default chatRouter;