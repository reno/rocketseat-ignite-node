import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { ICreateUserDTO } from '../dtos/createUser.dto';
import { AppDataSource } from '../../../data-source'


class UsersRepository {
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