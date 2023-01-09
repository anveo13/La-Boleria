import { Router } from "express";
import { postClients } from "../controllers/clientsControllers.js";
import clientMiddleware from "../middlewares/clientsMiddleware.js";


const clientsRouter = Router();

clientsRouter.post("/clients", clientMiddleware, postClients)


export default clientsRouter;