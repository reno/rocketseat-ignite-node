import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/appError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/users.repository';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.is_admin) {
    throw new AppError('User is not admin');
  }
  return next();
}
