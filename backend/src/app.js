import express from "express";
import chatRouter from "./routes/chat.routes.js";
import authMiddleWare from "./middlewares/auth.middleware.js";


// assisgn app to express() to initialize the app
const app = express();

app.use(express.json());

//Always have to add "/" at the beginning so express recognizes the path otherwise 404
//authMiddleWare protects all chat routes
app.use("/api/chat", authMiddleWare, chatRouter);



export default app;