import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able list all avaliable cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Name Car1",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 25,
      license_plate: "1234avc",
      brand: "Test Brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({});


    expect(cars).toEqual([car])

  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 25,
      license_plate: "1234avc",
      brand: "Volkswagen",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Volkswagen",
    });



    expect(cars).toEqual([car])
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 25,
      license_plate: "1234avc",
      brand: "Volkswagen",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car1",

    });


    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 25,
      license_plate: "1234avc",
      brand: "Volkswagen",
      category_id: "1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1234",

    });


    expect(cars).toEqual([car])
  });


});
