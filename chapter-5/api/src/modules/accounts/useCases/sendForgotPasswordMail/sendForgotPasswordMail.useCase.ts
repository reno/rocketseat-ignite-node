import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { resolve } from 'path';
import { IUsersRepository } from '@modules/accounts/repositories/iUsers.repository';
import { IUserTokensRepository } from '@modules/accounts/repositories/iUserTokens.repository';
import { AppError } from '@shared/errors/appError';
import { IDateProvider } from '@shared/container/providers/dateProvider/iDateProvider';
import { IMailProvider } from '@shared/container/providers/mailProvider/iMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );
    if (!user) {
      throw new AppError('User does not exist');
    }
    const token = uuid();
    const expires_date = this.dateProvider.addHours(3);
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };
    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };