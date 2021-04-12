import { CarImage } from "../infra/typeorm/entities/CarImage";
import { Car } from "../infra/typeorm/entities/Cars";


interface ICarsImagesRepository {
  
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository }