import { specificationRoutes } from "../../../routes/specification.routes";
import { Specification } from "../model/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO} from "./ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository{

  private specification: Specification[];

  constructor(){
    this.specification = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name, 
      description,
      created_at: new Date()
    });

    this.specification.push(specification)
  }
  findByName(name: string): Specification{
    const specification = this.specification.find(specification => specification.name === name);

    return specification
  }
  findAll(): Specification[]{
    return this.specification;
  }

}

export { SpecificationRepository}