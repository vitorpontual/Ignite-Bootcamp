import { Router } from "express";

import {categoriesRoutes as categoires} from "./categories.routes";

const routes = Router();

routes.use("/categories", categoires)

export  { routes }