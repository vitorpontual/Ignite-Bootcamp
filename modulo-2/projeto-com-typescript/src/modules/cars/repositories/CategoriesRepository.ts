import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";




class CategoriesRepository implements ICategoriesRepository{
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

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name);

    return category;
  };

}

export { CategoriesRepository };