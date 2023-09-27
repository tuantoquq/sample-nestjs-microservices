import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../models/users.schema';

const getUserFromContext = (context: ExecutionContext): UserDocument => {
  const request = context.switchToHttp().getRequest();
  return request.user;
};

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserFromContext(context),
);
