import { Router } from "express";
import { postClients, getOrdersByClientId } from "../controllers/clientsControllers.js";
import clientMiddleware from "../middlewares/clientsMiddleware.js";


const clientsRouter = Router();

clientsRouter.post("/clients", clientMiddleware, postClients)
clientsRouter.get("/clients/:id/orders", getOrdersByClientId)


export default clientsRouter;