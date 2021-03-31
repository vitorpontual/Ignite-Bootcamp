import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { categoriesRoutes } from "@shared/infra/http/routes/categories.routes";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Cars";


class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({ ...data })

    await this.repository.save(car)

    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate
    })

    return car
  }

  async findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true})
    
      if(brand){
        carsQuery.andWhere("brand = :brand", {brand})
      }
      if(category_id){
        carsQuery.andWhere("category_id = :category_id", {category_id})
      }
      if(name){
        carsQuery.andWhere("name = :name", {name})
      }

      const cars = await carsQuery.getMany();

      return cars
  }
}

export { CarsRepository }