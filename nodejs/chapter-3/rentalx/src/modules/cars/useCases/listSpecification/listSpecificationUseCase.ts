import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


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