import { Router } from 'express';
import multer from 'multer';
import { CreateCarController } from '@modules/cars/useCases/createCar/createCar.controller';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { ensureAdmin } from '../midlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars/listAvailableCars.controller';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/createCarSpecification.controller';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/uploadCarImages.controller';
import uploadConfig from '@config/upload'

const carsRouter = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController();
let createCarSpecificationController = new CreateCarSpecificationController();
let uploadCarImagesController = new UploadCarImagesController();

carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.post('/:id/specifications', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRouter.post('/images', ensureAuthenticated, uploadAvatar.array('images'), uploadCarImagesController.handle);

export { carsRouter };
