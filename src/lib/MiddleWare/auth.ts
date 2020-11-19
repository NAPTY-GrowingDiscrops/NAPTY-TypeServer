import { Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { verifyToken } from '../token';
import User from '../../entity/User';

const loginCheck = async (req, res: Response, next: NextFunction) => {
  const token: string = req.headers.token; 

  if (!token) {
    return res.status(401).json({
      message: "토큰이 없습니다",
    });
  } else {
    const decodedToken = await verifyToken(token);
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    req.user = user;
    next();
  }
}

const guestCheck = async (req, res: Response, next: NextFunction) => {
  const token: string = req.headers.token; 

  if (!token) {
    next();
  } else {
    const decodedToken = await verifyToken(token);
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    req.user = user;
    next();
  }
}

export default { loginCheck, guestCheck };