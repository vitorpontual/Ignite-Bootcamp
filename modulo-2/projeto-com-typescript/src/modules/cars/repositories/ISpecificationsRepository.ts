import { Category } from "../model/Category";
import { Specification } from "../model/Specification";
import { CreateSpecificationService } from "../services/CreateSpecificationService";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {

  create({name, description}: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
  findAll(): Specification[];
}

export { ISpecificationsRepository, ICreateSpecificationDTO }