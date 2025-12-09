import {Router} from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ message: "GET all users" }));

userRouter.get("/:id", (req, res) => res.send({message: "GET a specific user"}));

export default userRouter;