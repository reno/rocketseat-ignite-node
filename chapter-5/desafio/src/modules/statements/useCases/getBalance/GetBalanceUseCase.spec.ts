import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUseCase';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { OperationType } from '../../entities/Statement'
import { AppError } from '../../../../shared/errors/AppError';
import { CreateStatementUseCase } from '../createStatement/CreateStatementUseCase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe('Create a statement' , () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it('Should be able to list all withdrawals and deposits and the total balance', async () => {
    const user = await createUserUseCase.execute({
      name: 'Tests user',
      email: 'test@mail.com',
      password: 'p4ssw0rd'
    });

    const statement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: 'teste'
    });

    const balance = await getBalanceUseCase.execute({ user_id: user.id });
    expect(balance.statement.length).toEqual(1);
    expect(balance.statement[0].amount).toEqual(100);
  });
});