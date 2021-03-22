import { Router } from "express";

import {categoriesRoutes as categoires} from "./categories.routes";
import { specificationRoutes as specification } from "./specification.routes";

const routes = Router();

routes.use("/categories", categoires)
routes.use("/specification", specification)

export  { routes }