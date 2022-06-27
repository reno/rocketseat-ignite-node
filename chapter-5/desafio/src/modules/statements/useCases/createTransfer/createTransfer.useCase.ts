import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { OperationType, Statement } from '../../entities/Statement';
import { IStatementsRepository } from '../../repositories/IStatementsRepository';
import { ICreateTransferDTO } from './iCreateTransferDTO';
import { AppError } from './../../../../shared/errors/AppError';


@injectable()
class CreateTransferUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({
    user_id,
    sender_id,
    description,
    amount,
  }: ICreateTransferDTO): Promise<Statement> {
    const senderExists = await this.usersRepository.findById(sender_id);
    if (!senderExists) {
      throw new AppError('Sender not found', 401);
    }
    const recipientExists = await this.usersRepository.findById(user_id);
    if (!recipientExists) {
      throw new AppError('Recipient not found', 401);
    }
    const currentBalance = await this.statementsRepository.getUserBalance({
      user_id: sender_id,
      with_statement: false,
    });
    if (currentBalance.balance < amount) {
      throw new AppError('Insuficient funds', 400);
    }
    const transfer = await this.statementsRepository.transfer({
      user_id,
      sender_id,
      description,
      amount,
      type: OperationType.TRANSFER,
    });
    return transfer;
  }
}

export { CreateTransferUseCase };