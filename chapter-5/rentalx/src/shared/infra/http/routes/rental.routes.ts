import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();


rentalRoutes.use(ensureAuthenticated)
rentalRoutes.post("/", createRentalController.handle)

export { rentalRoutes }