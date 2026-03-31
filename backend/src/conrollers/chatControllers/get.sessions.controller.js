import { getSessions } from "../../repositories/sessions.repository.js";

const getSessionsController = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const userSessions = await getSessions(userId);
    console.log("Fetched user sessions again:", userSessions)

    if (!userSessions) {
        return res.status(404).send(({error: "No sessions found"}));
    }

    res.status(200).send({data: userSessions})

  } catch (error) {
    res.status(500).send({error: error})
  }
};

export default getSessionsController;