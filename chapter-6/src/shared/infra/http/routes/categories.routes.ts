import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest:"./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();


categoriesRoutes.get("/", listCategoriesController.handle)
categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", ensureAdmin, createCategoryController.handle);
categoriesRoutes.post("/import", ensureAdmin, upload.single("file"), importCategoryController.handle )

export { categoriesRoutes }