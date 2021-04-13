import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCar/listAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCaImageController";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig)


carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.use(ensureAuthenticated)
carsRoutes.use(ensureAdmin)
carsRoutes.post("/", createCarController.handle)
carsRoutes.post("/specifications/:id", createCarSpecificationController.handle)
carsRoutes.post("/images/:id", upload.array("images", 4), uploadCarImagesController.handle)

export { carsRoutes }