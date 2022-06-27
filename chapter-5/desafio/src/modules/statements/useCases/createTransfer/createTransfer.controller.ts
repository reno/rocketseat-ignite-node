import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { OperationType } from '../../entities/Statement';
import { CreateTransferUseCase } from './createTransfer.useCase';

export class CreateTransferController {
  async execute(request: Request, response: Response): Promise<Response> {
    const sender_id = request.user.id

    const { user_id } = request.params

    const { description, amount } = request.body

    const createTransferUseCase = container.resolve(CreateTransferUseCase)

    const transfer = await createTransferUseCase.execute({
      user_id,
      sender_id,
      description,
      amount,
      type: OperationType.TRANSFER,
    })

    return response.json(transfer)
  }
}