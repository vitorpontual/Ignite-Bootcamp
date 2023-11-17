import dayjs from "dayjs"

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";


let rentalRepositoryinMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24h = dayjs().add(1.5, "day").toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalRepositoryinMemory = new RentalRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(carsRepositoryInMemory ,rentalRepositoryinMemory, dayjsDateProvider);
  })

  it("should be able to create a new rental", async () => {
     const car = await carsRepositoryInMemory.create({
	name: "Test",
	description: "Car test",
	daily_rate: 100,
	license_plate: "1e32-xxx",
	fine_amount: 40,
	category_id: "1234",
	brand: "brand"
     })
    const rental = await createRentalUseCase.execute({
      user_id: "test",
      car_id: car.id,
      expected_return_date: dayAdd24h,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another open to the same user", async () => {
     const car = await rentalRepositoryinMemory.create({
	car_id: "1234",
	user_id: "1234",
	expected_return_date: dayAdd24h
     })
     await expect(
	createRentalUseCase.execute({
	   user_id: car.user_id,
	   car_id: "123",
	   expected_return_date: dayAdd24h
	})
     ).rejects.toEqual(new AppError("There's a rental in progress for user!"))

  })

  it("should not be able to create a new rental if there is another open to the same car", async () => {
     const car = await rentalRepositoryinMemory.create({
	car_id: "1234",
	user_id: "1234",
	expected_return_date: dayAdd24h
     })
    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: car.car_id,
        expected_return_date: dayAdd24h
      })
    ).rejects.toEqual(new AppError("Car is unavailable"))
  });

  it("should not be able to create a new renatl with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toEqual(new AppError("Invalid return time!"))
  });



})
