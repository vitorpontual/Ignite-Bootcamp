import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository} from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {

  categories: Category[] = [];


  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = await new Category();

    Object.assign(category, {
      name, description
    })

    this.categories.push(category)
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categories.find(category => category.name === name)

    return category
  }
  
  async list(): Promise<Category[]> {
    const list = await this.categories;

    return list
  }

}


export { CategoriesRepositoryInMemory}