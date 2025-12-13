import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from "../env.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const testDbConnection = async () => {
    const {error} = await supabase.from("profiles").select();
    
    if (error) {
        console.error(`Error connecting to database: ${error}`);
        return;
    }
    
    console.log("Successfull connection to database");

}

export default testDbConnection;