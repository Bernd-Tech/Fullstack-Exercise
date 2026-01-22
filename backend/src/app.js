import express from "express";
import chatRouter from "./routes/chat.routes.js";
import authMiddleWare from "./middlewares/auth.middleware.js";
import cors from 'cors';


// assisgn app to express() to initialize the app
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',  // Only allow this origin
  credentials: true  // Allow cookies/auth headers
};

app.use(express.json()); // handles content of request body
app.use(cors(corsOptions)); // handles request headers and allows requests from other origins

//Always have to add "/" at the beginning so express recognizes the path otherwise 404
//authMiddleWare protects all chat routes
app.use("/api/chat", authMiddleWare, chatRouter);



export default app;