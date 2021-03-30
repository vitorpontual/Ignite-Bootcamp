import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";


@injectable()
class ListSpecificationUseCase{

  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationsRepository){}

  async execute(): Promise<Specification[]>{
    const specification = await this.specificationRepository.findAll();

    return specification;
  }
}

export { ListSpecificationUseCase }