import { v4 as uuidv4 } from 'uuid';
import streamAiResponse from '../config/anthropicai/anthropic.ai.js';
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

    const streamResponse = (event, data) => {
        res.write(`event: ${event}\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    try {
    streamResponse("loadingStage", {stage: "Receiving your input..."});
    // To Do's: validate + sanitize message content
    console.log("Full user req: ", req.body, req.isNewSession)
    const {content, messageId, role, currentSessionId, createdAt} = req.body;
    const userInput = {role, content};
    const userId = req.user.id;
    const {isNewSession} = req;
    const title = "Super nice!";
    const aiResponseId = uuidv4();
    
    let tokenUsage;
    let completedAiResponse;
    let unixTimestamp;

    if (!content) {
        streamResponse("error", {message: "Invalid request."})
        return res.end();
    }

    if (isNewSession) {
        await insertNewChatSession(currentSessionId, userId, title);
    }

    await insertNewChatMessage(role, userId, currentSessionId, messageId, content, createdAt);
    
    const recentMessages = await getRecentMessages(currentSessionId, userId);

    streamResponse("loadingStage", {stage: "Thinking..."})

    const aiResponse = await streamAiResponse(recentMessages, streamResponse);
    console.log("aiResponse object: ", aiResponse)
    
    if (!aiResponse) {
        streamResponse("error", {message: "AI response unsuccessfull"})
        return res.end();
    }

    tokenUsage = aiResponse.usage.input_tokens + aiResponse.usage.output_tokens;
    completedAiResponse = aiResponse.content[0].text;
    unixTimestamp = Date.now();

    await insertNewChatMessage(aiResponse.role, userId, currentSessionId, aiResponseId, completedAiResponse, unixTimestamp, aiResponse.model, tokenUsage);
    console.log("ai response inserted in db");
   
    } catch (error) {
        console.log("ChatRoutes error: ", error.message);
        streamResponse("error", {message: error.message})
    } finally {
        res.end();
    }
};

export default chatMessagesController;