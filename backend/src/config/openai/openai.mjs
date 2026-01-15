import OpenAI from "openai";
import { OPENAI_API_KEY } from "../env.js";
import buildSystemPrompt from "./system.prompt.js";

const client = new OpenAI({
    apiKey: OPENAI_API_KEY
});

const generateAiResponse = async (userInput) => {
const systemPrompt = buildSystemPrompt();

const response = await client.responses.create({
    model: "gpt-5-nano",
    instructions: systemPrompt,
    input: userInput
});

return response;
}

export default generateAiResponse;

