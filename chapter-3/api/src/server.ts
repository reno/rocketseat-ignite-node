import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors'
import { router } from './routes'
import { AppError } from './errors/appError'
import swaggerFile from './swagger.json';
import './database';
import './shared/container';

const app = express();

app.use(express.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({message: error.message})
  }
  return response.status(500).json({ message: 'Internal server error'}) 
});

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
