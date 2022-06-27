
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '../createUser/ICreateUserDTO';
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe('Show user profile' , () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it('Should be able to show the user profile', async () => {
    const data: ICreateUserDTO = {
      name: 'Test user',
      email: 'user@test.com',
      password: 'p4ssw0rd',
    }
    const user = await createUserUseCase.execute(data);
    const result = await showUserProfileUseCase.execute(user.id);
    expect(result).toHaveProperty('id');
  });
});