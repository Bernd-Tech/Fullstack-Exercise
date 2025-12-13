import express from "express";
import userRouter from "./routes/user.routes.js";

// assisgn app to express() to initialize the app
const app = express();

app.use(express.json());
app.use("/api/v1/users", userRouter, () => console.log("Successfull access to users endpoint."));


export default app;