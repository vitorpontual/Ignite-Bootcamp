import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create Category", () => {
  // it("", ()=> {})
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it("shoube be able to create a new category", async ()=> {

    const category = {
      name: "Category Test",
      description: "Category description Test"
    }
    await createCategoryUseCase.execute({
      ...category
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

    expect(categoryCreated).toHaveProperty("id");
  });

  it("shoube not be able to create a new category with name exists", async ()=> {

      const category = {
        name: "Category Test",
        description: "Category description Test"
       };

      await createCategoryUseCase.execute({
        ...category
      });

     expect(
      createCategoryUseCase.execute({
        ...category
      })
    ).rejects.toEqual(new AppError("Category already exists"))


  });

});
