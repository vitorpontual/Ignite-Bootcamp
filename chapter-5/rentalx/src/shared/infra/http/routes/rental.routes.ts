import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import {DevolutionRentalController} from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import {ListUserRentalController} from "@modules/rentals/useCases/listUserRentals/listUserRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()
const listUserRentalController = new ListUserRentalController()


rentalRoutes.use(ensureAuthenticated)
rentalRoutes.post("/", createRentalController.handle)
rentalRoutes.post("/devolution/:id", devolutionRentalController.handle);
rentalRoutes.get("/user", listUserRentalController.handle)

export { rentalRoutes }
