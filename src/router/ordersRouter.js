import { Router } from "express";
import { getOrderById, getOrders, postOrders } from "../controllers/ordersControllers.js";
import ordersMiddleware from "../middlewares/ordersMiddleware.js";


const ordersRouter = Router();

ordersRouter.post("/order", ordersMiddleware, postOrders);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById)

export default ordersRouter
