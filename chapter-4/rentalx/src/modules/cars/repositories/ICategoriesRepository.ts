import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

// DTO => Data transfer object

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({name, description}: ICreateCategoryDTO): Promise<void>;

}

export { ICategoriesRepository}