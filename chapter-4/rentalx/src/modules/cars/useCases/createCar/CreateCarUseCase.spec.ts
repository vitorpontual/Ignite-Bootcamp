import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

  })
  
  it("should be able create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 25,
      license_plate: "1234avc",
      brand: "Test Brand",
      category_id: "category"
    });

    expect(car).toHaveProperty("id");
  });

  it("should be not be able create a car with exists license_plate", () => {
    expect( async () => {
      await createCarUseCase.execute({
        name: "Name Car1",
        description: "Description Car",
        daily_rate: 100,
        fine_amount: 25,
        license_plate: "1234avc",
        brand: "Test Brand",
        category_id: "category"
      });
      await createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car",
        daily_rate: 100,
        fine_amount: 25,
        license_plate: "1234avc",
        brand: "Test Brand",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should be able create a car with available true by default", async () => {
    const car =  await createCarUseCase.execute({
      name: "Name Car3",
      description: "Description Car",
      license_plate: "ABCD-1234",
      daily_rate: 100,
      fine_amount: 25,
      brand: "Test Brand",
      category_id: "category"
    });


    expect(car.available).toBe(true)
  })
});