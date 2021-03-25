import { Router } from "express";

import {categoriesRoutes as categories} from "./categories.routes";
import { specificationRoutes as specifications } from "./specification.routes";
import { userRoutes as users } from "./users.routes"
import { autheticateRoutes as auth } from "./authenticate.routes"

const routes = Router();

routes.use("/auth", auth)
routes.use("/categories", categories)
routes.use("/specification", specifications)
routes.use(auth)

export  { routes }