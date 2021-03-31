import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { AppError } from "@shared/errors/AppError"
import { carsRoutes } from "@shared/infra/http/routes/cars.router"
import { inject } from "tsyringe"


interface IRequest {
  car_id: string;
  specification_id: string[];
}


class CreateCarSpecificationUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepostiroy: ICarsRepository
  ){}


  async execute({ car_id, specification_id}: IRequest ): Promise<void> {

    const carExists = await this.carsRepostiroy.findById(car_id)

    if(!carExists){
      throw new AppError("Car does not exists!")
    }
  }

}

export { CreateCarSpecificationUseCase }