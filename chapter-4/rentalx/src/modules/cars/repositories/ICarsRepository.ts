import { ICreateCarsDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";


interface ICarsRepository {

  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>

}

export { ICarsRepository }