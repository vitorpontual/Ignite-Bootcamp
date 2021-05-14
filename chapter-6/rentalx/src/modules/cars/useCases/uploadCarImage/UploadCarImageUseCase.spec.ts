import { CarsImagesInMemory } from "@modules/cars/repositories/in-memory/CarsImagesInMemory"
import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implements/LocalStorageProvider";
import { UploadCarImagesUseCase } from "./UploadCarImageUseCase";


let carImagesInMemory: CarsImagesInMemory;
let uploadCarImageUseCase: UploadCarImagesUseCase;
let localStorageProvider: LocalStorageProvider; 

describe("Upload Image Car", () => {
  beforeEach(() => {
    carImagesInMemory = new CarsImagesInMemory();
    localStorageProvider = new LocalStorageProvider()
    uploadCarImageUseCase  = new UploadCarImagesUseCase(carImagesInMemory, localStorageProvider)
  })

  it("should be able to create a new image", async () => {
    const post = {
      car_id: "1234",
      images_name: ["bololo.png"]
    }
    await uploadCarImageUseCase.execute({
      ...post
    })

    const findcar = await carImagesInMemory.findImageByCarid(post.car_id)
  
    expect(findcar).toEqual(expect.arrayContaining([
      expect.objectContaining({id: findcar[0].id})
    ]))
  })

  it("should be able find a car image", async () => {
    const post = {
      car_id: "1234",
      images_name: ["bololo.png"]
    }
    await uploadCarImageUseCase.execute({
      ...post
    })
    const findcar = await carImagesInMemory.findImageByCarid("1234")

    expect(findcar[0]).toEqual(findcar[0])
    
  })

  it("should be able upload new images and delete old images", async () => {
    const post = {
      car_id: "1234",
      images_name: ["bololo.png"]
    }
    await uploadCarImageUseCase.execute({
      ...post
    })

    const post2 = {
      car_id: "1234",
      images_name: ["pitolomeu"]
    }

    await uploadCarImageUseCase.execute({
      ...post2
    })

    const findcar = await carImagesInMemory.findImageByCarid("1234")

    expect(findcar.length).toEqual(1)
  })
})