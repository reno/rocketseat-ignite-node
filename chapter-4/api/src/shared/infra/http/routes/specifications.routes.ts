import { Router } from 'express';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { ensureAdmin } from '../midlewares/ensureAdmin';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecification.controller';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };
