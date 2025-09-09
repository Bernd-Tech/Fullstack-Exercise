import express from "express";
import MenuRoutes from "./routes/menuRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";

const app = express();
app.use(express.json());

app.use("/menu", MenuRoutes);
app.use("/order", OrderRouter);

/*
Endpoints:
- menu items, get request
- order submit, post request
- 
*/



export default app;