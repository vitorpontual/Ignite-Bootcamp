import { Router } from "express";

import {categoriesRoutes as categories} from "./categories.routes";
import { specificationRoutes as specifications } from "./specification.routes";
import { userRoutes as users } from "./users.routes"

const routes = Router();

routes.use("/categories", categories)
routes.use("/specification", specifications)
routes.use("/users", users)

export  { routes }