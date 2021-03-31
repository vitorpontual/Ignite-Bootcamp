import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCar/listAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController();


carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }