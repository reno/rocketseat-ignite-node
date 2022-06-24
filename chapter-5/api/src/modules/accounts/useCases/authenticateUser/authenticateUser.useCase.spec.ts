import { AuthenticateUserUseCase } from './authenticateUser.useCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/usersInMemory.repository'
import { CreateUserUseCase } from '../createUser/createUser.useCase';
import { ICreateUserDTO } from '../../dtos/createUser.dto';
import { AppError } from '@shared/errors/appError';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/userTokens';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/userTokensInMemory.repository';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/dayjsDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authenticate user', () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
      );
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

  it('Should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: 'p4ssw0rd'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const data: ICreateUserDTO = {
      name: 'Test user',
      email: 'user@test.com',
      password: 'p4ssw0rd',
      driver_license: '12345678'
    }
    await createUserUseCase.execute(data);
    await expect(authenticateUserUseCase.execute({
        email: data.email,
        password: 'wr0ngP4ssw0rd'
    })).rejects.toBeInstanceOf(AppError);
  });
});