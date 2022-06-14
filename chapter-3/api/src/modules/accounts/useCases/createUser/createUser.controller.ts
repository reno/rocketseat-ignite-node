import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUser.useCase';
import { ICreateUserDTO } from '../../dtos/createUser.dto';

class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateUserDTO = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase)
    const user = await createUserUseCase.execute(data);
    return response.status(201).json(user);
  }
}

export { CreateUserController };