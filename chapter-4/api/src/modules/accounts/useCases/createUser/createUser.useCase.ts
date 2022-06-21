import * as bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe'
import { User } from '../../infra/typeorm/entities/user'
import { IUsersRepository } from '@modules/accounts/repositories/iUsers.repository'
import { ICreateUserDTO } from '@modules/accounts/dtos/createUser.dto'
import { AppError } from '@shared/errors/appError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const alreadyExists = await this.usersRepository.findByEmail(data.email);
    if (alreadyExists) {
      throw new AppError('User already exists', 401);
    }
    const hashedPassword = await bcrypt.hash(data.password, 8);
    data.password = hashedPassword;
    return this.usersRepository.create(data);
  }
}

export { CreateUserUseCase };