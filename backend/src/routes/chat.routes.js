import { Router } from "express";
import postMessageController from "../conrollers/chatControllers/post.message.controller.js";
import getSessionsController from "../conrollers/chatControllers/get.sessions.controller.js";
import getSessionMessagesController from "../conrollers/chatControllers/get.messages.controller.js";
import sessionMiddleware from "../middlewares/chat.session.middelware.js";
import generateSpeechFromText from "../config/elevenlabs/elevenlabs.tts.js";

const chatRouter = Router();

chatRouter.post("/messages", sessionMiddleware, postMessageController);

chatRouter.post("/speak", async (req, res) => {
  try {
    const { text } = req.body;
    const stream = await generateSpeechFromText(text);

    // Telling browser response is a mp3 audio file
    res.setHeader("Content-Type", "audio/mpeg");
    // Telling the browser that response data comes in series of chunks -> allows streaming to browser
    res.setHeader("Transfer-Encoding", "chunked");

    // pipe() connects the readable stream to the response object and forwards the arriving chunks from elevenlabs to browser through res
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

chatRouter.get("/sessions", getSessionsController);

chatRouter.get("/sessions/:sessionId/messages", getSessionMessagesController);

export default chatRouter;
