import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];


  async create(data: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data
    })

    this.cars.push(car);

    return car;
  }


  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.cars.find((car) => car.license_plate === license_plate);
  }

}

export { CarsRepositoryInMemory }