import { config } from "dotenv";

config({path: [".env"]});

export const { PORT, SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;