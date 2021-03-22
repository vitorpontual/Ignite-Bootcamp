import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";



class ListSpecificationUseCase{

  constructor(private specificationRepository: ISpecificationsRepository){}

  execute(): Specification[]{
    const specification = this.specificationRepository.findAll();

    return specification;
  }
}

export { ListSpecificationUseCase }