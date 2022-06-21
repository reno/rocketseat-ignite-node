import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { ICreateUserDTO } from '@modules/accounts/dtos/createUser.dto';
import { AppDataSource } from '@shared/infra/database/data-source'
import { IUsersRepository } from '@modules/accounts/repositories/iUsers.repository';


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { email }
    });
  }
}

export { UsersRepository };