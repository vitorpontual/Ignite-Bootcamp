import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {

  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute({ car_id, images_name }: IRequest): Promise<void> { 
    const oldImages = await this.carsImagesRepository.findImageByCarid(car_id)
    if(oldImages){
      oldImages.map(async images => {
        await this.carsImagesRepository.delete(images.id)
        await this.storageProvider.delete(images.image_name, "cars")
      })
    }
    
    const images = images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image)
      await this.storageProvider.save(image, 'cars')

    })

  }

}

export { UploadCarImagesUseCase }