import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import {DevolutionRentalController} from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()


rentalRoutes.use(ensureAuthenticated)
rentalRoutes.post("/", createRentalController.handle)
rentalRoutes.post("/devolution/:id", devolutionRentalController.handle);

export { rentalRoutes }
