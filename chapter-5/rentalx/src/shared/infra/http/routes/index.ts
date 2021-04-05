import { Router } from "express";

import {categoriesRoutes as categories} from "./categories.routes";
import { specificationRoutes as specifications } from "./specification.routes";
import { userRoutes as users } from "./users.routes"
import { autheticateRoutes as auth } from "./authenticate.routes"
import { carsRoutes as car} from "./cars.router"
import { rentalRoutes as rental } from "./rental.routes";

const routes = Router();

routes.use("/users", users)
routes.use("/categories", categories)
routes.use("/specification", specifications)
routes.use("/cars", car)
routes.use("/rentals", rental)
routes.use(auth)

export  { routes }