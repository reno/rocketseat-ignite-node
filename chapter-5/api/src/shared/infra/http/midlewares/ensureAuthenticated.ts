import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/appError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/users.repository';
import auth from '@config/auth';

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
    const { sub: userId } = verify(token, auth.secret_token) as IPayload;
    request.user = {
      id: userId
    };
    return next();
  } 
  catch (error) {
    throw new AppError('Invalid token', 401);
  }
}