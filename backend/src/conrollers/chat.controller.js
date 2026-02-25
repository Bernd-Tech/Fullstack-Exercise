import { v4 as uuidv4 } from 'uuid';
// import generateAiResponse from "../config/openai/openai.mjs";
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
    let fullAiResponseTokens = "";
    let completedAiResponse;

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
    console.log("aiResponse object: ", { aiResponse: aiResponse})
    
    if (!aiResponse) {
        streamResponse("error", {message: "AI response unsuccessfull"})
        return res.end();
    }

    streamResponse("loadingStage", {stage: "Generating response..."});

    
    // for await (const event of aiResponse) {
    //     if (event.type === "content_block_delta") {
    //         console.log("streamed event in for loop: ", event)
    //     } else {
    //         return;
    //     }
        // if (event.type === "response.output_text.delta") {
        //     console.log("streamed token: ", event.delta);
        //     fullAiResponseTokens += event.delta; // Need to accumulate all response tokens and assign to fullAiResponse
        //     stream("responseToken",  event.delta)
        // }

        // if (event.type === "response.completed") {
        //     completedAiResponse = event.response;
        //     stream("done", { ok: true });
        // }
    //}
    console.log("About to insert ai response");
    //ToDo: Somehow need to get exact model from response and not manually
    await insertNewChatMessage("assistant", userId, currentSessionId, aiResponseId, fullAiResponseTokens, completedAiResponse.created_at * 1000, completedAiResponse.model);
    console.log("ai response inserted in db");
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
        streamResponse("error", {message: error.message})
    } finally {
        res.end();
    }
};

export default chatMessagesController;