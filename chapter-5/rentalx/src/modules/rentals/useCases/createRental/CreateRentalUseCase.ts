import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";



interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }
  async execute(data: IRequest): Promise<Rental> {
    const minHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(data.car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(data.user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!")
    }

    const expectedReturnDateFormat = this.dateProvider.convertToUtc(data.expected_return_date);

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours( dateNow, data.expected_return_date);

    if(compare < minHour){
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({ ...data });

    await this.carsRepository.updateAvailable(data.car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase }
