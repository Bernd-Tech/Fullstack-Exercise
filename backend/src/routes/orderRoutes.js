import {Router} from "express";
import { createOrder } from "../conrollers/order.controller.js";

const OrderRouter = Router();

OrderRouter.post("/", createOrder);

export default OrderRouter;