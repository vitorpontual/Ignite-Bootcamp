import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

let createCarController = new CreateCarController()

carsRoutes.post("/",ensureAuthenticated, createCarController.handle)

export { carsRoutes }