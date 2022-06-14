import { inject, injectable } from 'tsyringe'
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user'
import { UsersRepository } from '../../repositories/users.repository'
import { ICreateUserDTO } from '../../dtos/createUser.dto'
import { AppError } from '../../../../errors/appError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
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