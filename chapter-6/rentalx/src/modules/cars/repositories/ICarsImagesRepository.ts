import { CarImage } from "../infra/typeorm/entities/CarImage";
import { Car } from "../infra/typeorm/entities/Cars";


interface ICarsImagesRepository {
  
  create(car_id: string, image_name: string): Promise<CarImage>;
  findImageByCarid(car_id: string): Promise<CarImage[]>;
  delete(image_id: string): Promise<void>;
}

export { ICarsImagesRepository }