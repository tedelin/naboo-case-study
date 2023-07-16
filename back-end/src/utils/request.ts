import { Request as ExpressRequest } from 'express';
import { UserDto } from 'src/user/types/user.dto';

export interface Request extends ExpressRequest {
  user?: UserDto & { iat: number; exp: number };
}
