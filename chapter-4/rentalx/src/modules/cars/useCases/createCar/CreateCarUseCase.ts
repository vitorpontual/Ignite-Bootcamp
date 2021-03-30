import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
// import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject("")
    private carsRepositroy: ICarsRepository
  ) { }


  async execute({ name, description, license_plate, category_id, fine_amount, daily_rate, brand }: IRequest): Promise<Car> {

    const carAlreadyExists = await this.carsRepositroy.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepositroy.create({
      name,
      description,
      license_plate,
      category_id,
      fine_amount,
      daily_rate,
      brand
    });


    return car;
  }

}

export { CreateCarUseCase }