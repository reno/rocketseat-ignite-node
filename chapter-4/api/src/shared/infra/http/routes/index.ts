import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { carsRouter } from './cars.routes';
import { rentalRoutes } from './rental.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRouter);
router.use('/rentals', rentalRoutes);

router.use('/', authRoutes);

export { router };