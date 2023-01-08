import { Router } from "express";
import { postCakes } from "../controllers/cakesControllers.js"
import { cakesMiddleware } from "../middlewares/cakesMiddleware.js"

const cakesRouter = Router();

cakesRouter.post("/cakes", cakesMiddleware, postCakes);

export default cakesRouter;