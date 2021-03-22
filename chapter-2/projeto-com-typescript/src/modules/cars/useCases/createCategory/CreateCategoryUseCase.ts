import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IRequest {
  name: string;
  description: string;
};

class CreateCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute({ name, description }: IRequest): void{
    const categoryAlreadyExistis = this.categoriesRepository.findByName(name);


    if (categoryAlreadyExistis) {
      throw new Error("Category already exists")
    }

    category = this.categoriesRepository.create({
      name,
      description
    });


  }
}

export { CreateCategoryUseCase }
