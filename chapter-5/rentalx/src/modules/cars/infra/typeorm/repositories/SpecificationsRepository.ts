import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";


class SpecificationRepository implements ISpecificationsRepository{

  private respository: Repository<Specification>;

  public constructor(){
    this.respository = getRepository(Specification)
  }
  ;
  
  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.respository.create({
      name,
      description
    })
    
    await this.respository.save(specification)

    return specification
  }
  async findByName(name: string):Promise <Specification>{
    const specification = await this.respository.findOne({name})
    
    return specification
  }
  async findAll(): Promise<Specification[]>{
    const specification = await this.respository.find();
    
    return specification
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.respository.findByIds(ids);
    return specification
  }
  
}

export { SpecificationRepository}
