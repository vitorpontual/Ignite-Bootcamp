import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { specificationRoutes } from "@shared/infra/http/routes/specification.routes";
import { isConstructorDeclaration } from "typescript";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"



let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationsUseCase: CreateCarSpecificationUseCase;
let specificatoinRepositoryInMemory: SpecificationRepositoryInMemory;



describe(("Create Car Specification"), () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificatoinRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationsUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificatoinRepositoryInMemory);
    
  })

  it("should not be able to add a new specification to thea none-existent car", () => {
    expect(async () => {
      const car_id = "1234";
    const specification_id = ["51234"]


    await createCarSpecificationsUseCase.execute({car_id, specification_id});
    }).rejects.toBeInstanceOf(AppError)
    
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 25,
      license_plate: "1234avc",
      brand: "Test Brand",
      category_id: "category"
    })

    const specification = await specificatoinRepositoryInMemory.create({
      description: "Biru",
      name: "Leibe"
    })

    const specification_id = [specification.id]

    const specificationsCars = await createCarSpecificationsUseCase.execute({car_id: car.id, specification_id});

    expect(specificationsCars).toHaveProperty("specifications")
    expect(specificationsCars.specifications.length).toBe(1)

  });

})