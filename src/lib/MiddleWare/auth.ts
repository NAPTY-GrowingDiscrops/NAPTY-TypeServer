import { Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { verifyToken } from '../token';
import User from '../../entity/User';

export default async (req, res: Response, next: NextFunction) => {
  const token: string = req.headers.token; 

  if (!token) {
    return res.status(401).json({
      message: "토큰이 없습니다",
    });
  } else {
    const decodedToken = await verifyToken(token);
    console.log(decodedToken);
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        id: decodedToken.id,
      },
    });
    console.log(user);

    req.user = user;
    next();
  }
}