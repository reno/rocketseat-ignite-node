import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUseCase';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateStatementUseCase } from './CreateStatementUseCase';
import { OperationType } from '../../entities/Statement'
import { AppError } from '../../../../shared/errors/AppError';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe('Create a statement' , () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it('Should be able to create a deposit', async () => {
    const user = await createUserUseCase.execute({
      name: 'Test user',
      email: 'test@mail.com',
      password: 'p4ssw0rd'
    });
    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'teste'
    });
    expect(statement).toHaveProperty('id');
  });

  it('Should be able to create a withdraw', async () => {
    const user = await createUserUseCase.execute({
      name: 'Test user',
      email: 'test@mail.com',
      password: 'p4ssw0rd'
    });
    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'teste'
    });
    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.WITHDRAW,
      amount: 100,
      description: 'teste'
    });
    expect(statement).toHaveProperty('id');
  });

  it('Should not be able to do a withdraw without funds', async () => {
    await expect(async () => {
      const user = await createUserUseCase.execute({
        name: 'Test user',
        email: 'test@mail.com',
        password: 'p4ssw0rd'
      });
      const statement = await createStatementUseCase.execute({
        user_id: user.id,
        type: OperationType.WITHDRAW,
        amount: 100,
        description: 'teste'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});