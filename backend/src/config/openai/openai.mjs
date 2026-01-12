import OpenAI from "openai";
import buildSystemPrompt from "./system.prompt";

const client = new OpenAI();

const generateAiResponse = async (userInput) => {
const systemPrompt = buildSystemPrompt();

const response = await client.responses.create({
    model: "gpt-5-nano",
    instructions: systemPrompt,
    input: userInput
});
console.log(response.output_text);
return response;
}

export default generateAiResponse;

