import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";


interface ISpecificationsRepository {

  create({name, description}: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findAll(): Promise<Specification[]>;

}

export { ISpecificationsRepository }