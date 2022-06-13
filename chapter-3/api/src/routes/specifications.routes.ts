import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecification.controller';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
