import { Router } from 'express';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRental.controller';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRental.controller';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/listRentalsByUser.controller';
import { ensureAuthenticated } from '@shared/infra/http/midlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };