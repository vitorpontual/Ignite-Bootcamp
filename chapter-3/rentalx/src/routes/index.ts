import { Router } from "express";

import {categoriesRoutes as categories} from "./categories.routes";
import { specificationRoutes as specifications } from "./specification.routes";

const routes = Router();

routes.use("/categories", categories)
routes.use("/specification", specifications)

export  { routes }