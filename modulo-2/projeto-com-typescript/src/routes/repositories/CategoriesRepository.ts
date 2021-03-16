import { Category } from "../../model/Category";

// DTO => Data transfer object

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];

  };

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, { // Atribuir as váriavies
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);
  };

  findAll(): Category[] {
    return this.categories;
  };

}

export { CategoriesRepository };