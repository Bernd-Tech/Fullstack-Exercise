import app from "./src/app.js";
import "dotenv/config";
import { PORT } from "./src/config/env.js";
import { testDbConnection } from "./src/config/database/supabase.js";
import aiModelTest from "./src/config/openai/openai.mjs";

app.listen(PORT, async () => {
    console.log(`Server running on port: ${PORT}`)
    await testDbConnection();
});