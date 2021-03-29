import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{

  private respository: Repository<Category>;

  public constructor() {
    this.respository = getRepository(Category);
  };

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    
    const category = this.respository.create({
      description,
      name
    })
    
    await this.respository.save(category)
  };

  async list(): Promise<Category[]> {
    const categories = await this.respository.find();

    return categories;
  };

  async findByName(name: string): Promise<Category> {
    const category = await this.respository.findOne({ name });

    return category;
  };

}

export { CategoriesRepository };