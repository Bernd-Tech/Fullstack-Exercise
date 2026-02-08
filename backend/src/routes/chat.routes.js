import { Router } from "express";
import chatController from "../conrollers/chat.controller.js";
import sessionMiddleware from "../middlewares/chat.session.middelware.js";

const chatRouter = Router();

chatRouter.post("/messages", sessionMiddleware, chatController);

export default chatRouter;