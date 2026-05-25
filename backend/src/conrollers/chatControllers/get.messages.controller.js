import { getSessionMessages } from "../../repositories/messages.repository.js";

const getSessionMessagesController = async (req, res) => {
    try {

        console.log("Fetching messages for session:", req);
        const userId = req.user.id;
        const {sessionId} = req.params;

        const sessionMessages = await getSessionMessages(sessionId, userId);

        if (!sessionMessages) {
            throw res.status(404).send(({error: "No messages found for this session"}));
        }

        res.status(200).setHeader("Cache-Control", "private").json({sessionId, messages: sessionMessages});
    } catch (error) {
        console.error("Error fetching session messages:", error);
        throw res.status(500).json({error: "Failed to fetch session messages"});
    }
};

export default getSessionMessagesController;