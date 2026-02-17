import OpenAI from "openai";
import { OPENAI_API_KEY } from "../env.js";
import buildSystemPrompt from "./system.prompt.js";

const client = new OpenAI({
    apiKey: OPENAI_API_KEY
});

const generateAiResponse = async (recent_context) => {
try {
const systemPrompt = buildSystemPrompt();

const response = await client.responses.create({
    model: "gpt-5-nano",
    instructions: systemPrompt,
    input: [...recent_context]

});

// Open Ai delivers unix timestamp in seconds not milliseconds. therefore * 1000
return {
    text: response.output_text, 
    token_usage: response.usage,
    model: response.model,
    created_at: response.completed_at * 1000,
};

} catch (error) {
    throw error;
}
}

const generateSpeechFromText = async (text) => {
  try {
    const mp3 = await client.audio.speech.create({
      model: "gpt-4o-mini-tts-2025-12-15",
      voice: "marin", // alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, verse, marin, cedar
      input: text
    });

    // Convert to Buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());
    
    return buffer;
  } catch (error) {
    console.log("Error from openAI speech API call: ", error)
    throw error;
  }
}

export {generateAiResponse as default, generateSpeechFromText}
