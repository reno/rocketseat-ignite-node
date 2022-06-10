import { SpecificationsRepository } from "../../repositories/specifications.repository";
import { CreateSpecificationUseCase } from "./createSpecification.useCase";
import { CreateSpecificationController } from "./createSpecification.controller";

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };