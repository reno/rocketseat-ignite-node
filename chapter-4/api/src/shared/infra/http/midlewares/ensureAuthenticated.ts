import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/appError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/users.repository';

interface IPayload {
  sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Missing authorization token', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const { sub: userId } = verify(token, 'b570e354b7ebc40e20029fcc7a15e5a7') as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User does not exist');
    }
    request.user = {
      id: userId
    };
    return next();
  } 
  catch (error) {
    throw new AppError('Invalid token', 401);
  }
}