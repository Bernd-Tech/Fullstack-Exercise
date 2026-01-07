import { Router } from "express";
import authMiddleWare from "../middlewares/auth.middleware";

const chatRouter = Router();

app.post("/messages", authMiddleWare, (req, res, next) => {
    
})