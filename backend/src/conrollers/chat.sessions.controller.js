import { getSessions } from "../repositories/sessions.repository.js";

const chatSessionsController = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const userSessions = await getSessions(userId);
    console.log("Fetched user sessions:", userSessions)

    if (!userSessions) {
        return res.status(404).send(json({error: "No sessions found"}));
    }

    res.status(200).send({data: userSessions})

  } catch (error) {}
};

export default chatSessionsController;