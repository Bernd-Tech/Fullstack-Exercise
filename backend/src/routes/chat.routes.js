import { Router } from "express";
import chatMessagesController from "../conrollers/chat.controller.js";
import sessionMiddleware from "../middlewares/chat.session.middelware.js";
import generateSpeechFromText from "../config/elevenlabs/elevenlabs.tts.js";

const chatRouter = Router();

chatRouter.post("/messages", sessionMiddleware, chatMessagesController);

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
})

export default chatRouter;