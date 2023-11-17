import { inject, injectable } from "tsyringe"

import { AppError } from "@shared/errors/AppError"
import { Car } from "@modules/cars/infra/typeorm/entities/Cars"
import { carsRoutes } from "@shared/infra/http/routes/cars.router"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"


interface IRequest {
  car_id: string;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepostiroy: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationsRepository
  ){}


  async execute({ car_id, specification_id}: IRequest ): Promise<Car> {

    const carExists = await this.carsRepostiroy.findById(car_id)

    if(!carExists){
      throw new AppError("Car does not exists!")
    }

    const specifications = await this.specificationRepository.findByIds(specification_id)

    carExists.specifications = specifications

    await this.carsRepostiroy.create(carExists);

    console.log(carExists)

    return carExists;
  }

}

export { CreateCarSpecificationUseCase }
