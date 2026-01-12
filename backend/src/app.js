import express from "express";
import chatRouter from "./routes/chat.routes";
import authMiddleWare from "./middlewares/auth.middleware";


// assisgn app to express() to initialize the app
const app = express();

app.use(express.json());

app.use("api/chat", authMiddleWare, chatRouter);



export default app;