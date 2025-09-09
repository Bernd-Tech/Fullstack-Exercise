import { Router } from "express";
import { getMenuItem, getAllMenuItems } from "../conrollers/menu.controllers.js";

const MenuRoutes = Router();

MenuRoutes.get("/", getMenuItem)
MenuRoutes.get("/allmenuitems", getAllMenuItems)

export default MenuRoutes;

