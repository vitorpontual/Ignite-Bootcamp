import dayjs from "dayjs"

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let rentalRepositoryinMemory: RentalRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const dayAdd24h = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryinMemory = new RentalRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryinMemory, dayjsDateProvider);
  })

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "test",
      car_id: "121212",
      expected_return_date: dayAdd24h,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "123aqw",
        expected_return_date: dayAdd24h
      });

      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "321ewq",
        expected_return_date: dayAdd24h
      });
    }).rejects.toBeInstanceOf(AppError)

  })


  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24h
      });


      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24h
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should not be able to create a new renatl with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });



})