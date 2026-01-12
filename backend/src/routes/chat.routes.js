import { Router } from "express";
import supabase from "../config/database/supabase";
import generateAiResponse from "../config/openai/openai.mjs";

const chatRouter = Router();

//Have to validate and sanitize post req before passing to controller -> With zod library?
app.post("/messages", async (req, res, next) => {
    try {
    // To Do's: extract message content and user id from req
    // To Do's: validate message content
    // store message in database with role of "user"
    // call openAI to generate ai response
    // store ai response in db with role of "assistant"
    // send response to client
    const {content} = req.body;
    const userId = req.user.id;

    if (!content) {
        res.status(400).json({error: "Invalid Request"});
    } else {
        const cleanContent = content.trim();
    }

    newChatInsert("user", content)

    const aiResponse = await generateAiResponse();
    console.log("Generated response", aiResponse);

    if (!aiResponse) {
        res.status(500).json({error: "AI response unsuccessfull"})
    }

    newChatInsert("assistant", aiResponse, "gpt-5-nano")

    } catch (error) {
        console.log("ChatRoutes error:", error.message);
        res.status(400).json({error: "Invalid Request"});
    }
})

export default chatRouter;