import { inject, injectable } from 'tsyringe'
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { User } from '../../entities/user'
import { UsersRepository } from '../../repositories/users.repository'
import { AppError } from '../../../../errors/appError'

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string,
}


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError('Email or password invalid', 401);
    }
    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      throw new AppError('Email or password invalid', 401);
    }
    const token = sign({}, 'b570e354b7ebc40e20029fcc7a15e5a7', {
      subject: user.id,
      expiresIn: '1d'
    });
    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase };