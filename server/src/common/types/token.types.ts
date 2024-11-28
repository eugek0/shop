import { ID } from '@common/types';

export interface ITokens {
  access: string;
  refresh: string;
}

export interface ITokenValue extends IPayload {
  exp: number;
  iat: number;
}

export interface IPayload {
  email: string;
  jti: ID;
  iss: string;
  id: ID;
}
