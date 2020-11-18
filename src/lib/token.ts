import jwt, { SignOptions } from 'jsonwebtoken';
import { ParsedUrlQuery } from 'querystring';
import { tokenToString } from 'typescript';

import { JWT_SECRET, MAIL_SECRET } from '../config/Secret';

export const createToken = async (id: string): Promise<string> => {
  const payload = {
    id,
  };

  const options: SignOptions = {
    expiresIn: '30d',
  }

  return jwt.sign(payload, JWT_SECRET, options);
}

export const createMailToken = async (email: string): Promise<string> => {
  const payload = {
    email,
  };

  const options: SignOptions = {
    expiresIn: '30m',
  }

  return jwt.sign(payload, MAIL_SECRET, options);
}

export const verifyMailToken = async (token: any): Promise<any> => jwt.verify(token, MAIL_SECRET);

export const verifyToken = async (token: string): Promise<any> => jwt.verify(token, JWT_SECRET);