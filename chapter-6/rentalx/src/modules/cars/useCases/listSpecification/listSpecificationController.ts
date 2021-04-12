import {Request, Response} from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";
import { ListSpecificationUseCase } from "./listSpecificationUseCase";

class ListSpecificationController {

  async handle(request: Request, response: Response): Promise<Response>{

    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase)

    const all = await listSpecificationUseCase.execute();

    return response.json(all)
  }
}

export { ListSpecificationController }