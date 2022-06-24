import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { IUsersRepository } from '@modules/accounts/repositories/iUsers.repository'
import { AppError } from '@shared/errors/appError'
import { IUserTokensRepository } from '@modules/accounts/repositories/iUserTokens.repository';
import { IDateProvider } from '@shared/container/providers/dateProvider/iDateProvider';
import auth from '@config/auth';

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
  refresh_token: string
}


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;
    if (!user) {
      throw new AppError('Email or password invalid', 401);
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new AppError('Email or password invalid', 401);
    }
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };