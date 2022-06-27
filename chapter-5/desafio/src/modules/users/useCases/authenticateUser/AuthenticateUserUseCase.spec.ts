import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { ICreateUserDTO } from '../createUser/ICreateUserDTO';
import { AppError } from '../../../../shared/errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Authenticate user', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('Should be able to authenticate an user', async () => {
    const data: ICreateUserDTO = {
      name: 'Test user',
      email: 'user@test.com',
      password: 'p4ssw0rd',
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
  //     }
  //     await createUserUseCase.execute(data);
  //     authenticateUserUseCase.execute({
  //       email: data.email,
  //       password: 'wr0ngP4ssw0rd'
  //     });
  //   }).rejects.toBeInstanceOf(AppError);
  // });

});