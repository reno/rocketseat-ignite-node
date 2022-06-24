
import { User } from '../infra/typeorm/entities/user';
import { ICreateUserDTO } from '../dtos/createUser.dto';


interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };