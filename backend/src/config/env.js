import { config } from "dotenv";

config({path: [".env.local"]});

export const { PORT, SUPABASE_URL, SUPABASE_SERVICE_KEY, OPENAI_API_KEY } = process.env;