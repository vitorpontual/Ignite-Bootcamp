import { Request, Response } from "express"
import { categoriesRoutes } from "../../../../routes/categories.routes"
import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase){}
  handle(request: Request, response: Response): Response{

    const all =  this.listCategoriesUseCase.execute();

    return response.json(all)
  }

}

export { ListCategoriesController }