import { Router } from "express";
import chatMessagesController from "../conrollers/chat.controller.js";
import sessionMiddleware from "../middlewares/chat.session.middelware.js";
import { generateSpeechFromText } from "../config/openai/openai.mjs";

const chatRouter = Router();

chatRouter.post("/messages", sessionMiddleware, chatMessagesController);

chatRouter.post("/speak", async (req, res) => {
    try {
    const { text } = req.body;
    console.log("ai text posted to /speak endpoint: ", text)
    
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const audioBuffer = await generateSpeechFromText(text);
    
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(audioBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default chatRouter;