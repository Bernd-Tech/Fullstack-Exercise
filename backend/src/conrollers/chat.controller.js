import { v4 as uuidv4 } from 'uuid';
import generateAiResponse from "../config/openai/openai.mjs";
import { insertNewChatMessage } from '../repositories/messages.repository.js';
import { insertNewChatSession } from '../repositories/sessions.repository.js';
import { getRecentMessages } from '../repositories/messages.repository.js';

//Have to validate and sanitize post req before passing to controller -> With zod library?
const chatMessagesController = async (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no'
    });
    res.flushHeaders();

    const stream = (event, data) => {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    try {
    stream("loadingStage", {stage: "Receiving your input..."});
    // To Do's: validate + sanitize message content
    console.log("Full user req: ", req.body, req.isNewSession)
    const {content, messageId, role, currentSessionId, createdAt} = req.body;
    const userInput = {role, content};
    const userId = req.user.id;
    const {isNewSession} = req;
    const title = "Super nice!";
    const aiResponseId = uuidv4();

    if (!content) {
        stream("error", {message: "Invalid request."})
        return res.end();
    }

    if (isNewSession) {
        await insertNewChatSession(currentSessionId, userId, title);
    }

    await insertNewChatMessage(role, userId, currentSessionId, messageId, content, createdAt);
    
    const recentMessages = await getRecentMessages(currentSessionId, userId);

    stream("loadingStage", {stage: "Thinking..."})

    const aiResponse = await generateAiResponse(recentMessages, userInput);

    if (!aiResponse) {
        stream("error", {message: "AI response unsuccessfull"})
        return res.end();
    }

    stream("loadingStage", {stage: "Generating response..."});

    for await (const event of aiResponse) {
        if (event.type === "response.output_text.delta") {
            console.log(event.delta);
            stream("responseToken",  event.delta)
        }

        if (event.type === "response.completed") {
            stream("done", { ok: true });
        }
    }

    await insertNewChatMessage("assistant", userId, currentSessionId, aiResponseId, aiResponse.text, aiResponse.created_at, aiResponse.model);

    // return res.status(201).json({
    //     success: true,
    //     message: {
    //         ai_response: aiResponse.text,
    //         ai_response_id: aiResponseId,
    //         created_at: aiResponse.created_at,
    //         user_request_id: messageId,
    //         currentSessionId: currentSessionId
    //     }
    // })
    } catch (error) {
        console.log("ChatRoutes error: ", error.message);
        stream("error", {message: error.message})
    } finally {
        res.end();
    }
};

export default chatMessagesController;