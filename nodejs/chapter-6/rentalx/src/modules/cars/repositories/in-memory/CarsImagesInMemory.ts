import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "../ICarsImagesRepository";


export class CarsImagesInMemory implements ICarsImagesRepository {

  carsImages: CarImage[] = [];

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id,
      image_name
    })

    await this.carsImages.push(carImage);

    return carImage
  }
  async findImageByCarid(car_id: string): Promise<CarImage[]> {
    const cars = this.carsImages.filter(image => image.car_id === car_id)

    return cars
  }
  async delete(image_name: string): Promise<void> {
    const car_image = this.carsImages.find(carImage => carImage.image_name === image_name)

    this.carsImages.splice(
      this.carsImages.indexOf(car_image)
    )

  }

}