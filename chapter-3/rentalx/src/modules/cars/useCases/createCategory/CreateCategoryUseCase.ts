import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IRequest {
  name: string;
  description: string;
};

@injectable()
class CreateCategoryUseCase {

  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: IRequest): Promise<void>{
    const categoryAlreadyExistis = await this.categoriesRepository.findByName(name);


    if (categoryAlreadyExistis) {
      throw new AppError("Category already exists")
    }

    this.categoriesRepository.create({
      name,
      description
    });


  }
}

export { CreateCategoryUseCase }
