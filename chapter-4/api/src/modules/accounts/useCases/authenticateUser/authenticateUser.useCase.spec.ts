import { AuthenticateUserUseCase } from './authenticateUser.useCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/usersInMemory.repository'
import { CreateUserUseCase } from '../createUser/createUser.useCase';
import { ICreateUserDTO } from '../../dtos/createUser.dto';
import { AppError } from '@shared/errors/appError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const data: ICreateUserDTO = {
      name: 'Test user',
      email: 'user@test.com',
      password: 'p4ssw0rd',
      driver_license: '12345678'
    }
    const user = await createUserUseCase.execute(data);
    const result = await authenticateUserUseCase.execute({
      email: data.email,
      password: data.password
    });
    expect(result).toHaveProperty('token')
  });

  // it('Should not be able to authenticate an nonexistent user', async () => {
  //   await expect(async () => {
  //     authenticateUserUseCase.execute({
  //       email: 'false@mail.com',
  //       password: 'p4ssw0rd'
  //     });
  //   }).rejects.toBeInstanceOf(AppError);
  // });

  // it('Should not be able to authenticate with wrong password', async () => {
  //   await expect(async () => {
  //     const data: ICreateUserDTO = {
  //       name: 'Test user',
  //       email: 'user@test.com',
  //       password: 'p4ssw0rd',
  //       driver_license: '12345678'
  //     }
  //     await createUserUseCase.execute(data);
  //     authenticateUserUseCase.execute({
  //       email: data.email,
  //       password: 'wr0ngP4ssw0rd'
  //     });
  //   }).rejects.toBeInstanceOf(AppError);
  // });

});