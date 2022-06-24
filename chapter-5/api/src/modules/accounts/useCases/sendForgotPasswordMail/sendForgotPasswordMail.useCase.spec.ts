import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/usersInMemory.repository';
import { UserTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/userTokensInMemory.repository';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/dayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/mailProvider/in-memory/mailProviderInMemory';
import { AppError } from '@shared/errors/appError';
import { SendForgotPasswordMailUseCase } from './sendForgotPasswordMail.useCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send forgot password email', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('Should be able to send a forgot password email to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '664168',
      email: 'avzonbop@ospo.pr',
      name: 'Blanche Curry',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('avzonbop@ospo.pr');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ka@uj.gr')
    ).rejects.toEqual(AppError);
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(userTokensRepositoryInMemory, 'create');

    usersRepositoryInMemory.create({
      driver_license: '787330',
      email: 'abome@regrog.ee',
      name: 'Leon Perkins',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('abome@regrog.ee');

    expect(generateTokenMail).toBeCalled();
  });
});