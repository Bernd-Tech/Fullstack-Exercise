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

export default generateAiResponse;

