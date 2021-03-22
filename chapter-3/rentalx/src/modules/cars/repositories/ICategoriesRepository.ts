import { Category } from "../model/Category";

// DTO => Data transfer object

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository {
  findByName(name: string): Category;
  findAll(): Category[];
  create({name, description}: ICreateCategoryDTO): void

}

export { ICategoriesRepository, ICreateCategoryDTO }