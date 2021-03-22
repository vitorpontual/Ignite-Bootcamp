import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepository implements ISpecificationsRepository{

  private specification: Specification[];

  private static INSTANCE: SpecificationRepository;

  constructor(){
    this.specification = [];
  }

  public static getIntance(): SpecificationRepository{
    if(!SpecificationRepository.INSTANCE){
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE
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