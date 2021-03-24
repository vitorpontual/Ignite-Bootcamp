import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepository implements ISpecificationsRepository{

  private respository: Repository<Specification>;

  public constructor(){
    this.respository = getRepository(Specification)
  };

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.respository.create({
      name,
      description
    })

    await this.respository.save(specification)
  }
  async findByName(name: string):Promise <Specification>{
    const specification = await this.respository.findOne({name})

    return specification
  }
  async findAll(): Promise<Specification[]>{
    const specification = await this.respository.find();

    return specification
  }

}

export { SpecificationRepository}