import supabase from "../config/database/supabase";

const newChatInsert = async (role, message, model) => {
    const {error} = await supabase
    .from('chat_messages')
    .insert({
        role: role,
        message: message,
        created_at: new Date(),
        ai_model: null || model
    })

    if (error) {
        return res.status(500).json({error: "Database connection unsuccessfull"})
    }
}

export default newChatInsert;