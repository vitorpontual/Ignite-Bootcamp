import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateCategoryController } from "../createCategory/createCategoryController";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


const specificationRepository = SpecificationRepository.getIntance()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }