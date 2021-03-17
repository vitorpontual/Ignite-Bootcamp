import {Request, Response} from "express";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";
import { ListSpecificationUseCase } from "./listSpecificationUseCase";

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase){}

  handle(request: Request, response: Response): Response{
    const all = this.listSpecificationUseCase.execute();

    return response.json(all)
  }
}

export { ListSpecificationController }