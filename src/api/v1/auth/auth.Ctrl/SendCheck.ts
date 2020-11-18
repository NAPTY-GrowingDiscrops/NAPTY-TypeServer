import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../../../entity/User';
import { verifyMailToken } from '../../../../lib/token';

export default async (req: Request, res: Response) => {
  const token = req.query.token;
  
  try {
    const decodedToken = await verifyMailToken(token);
    const userRepo = getRepository(User);

    const data: User = await userRepo.findOne({
      where: {
        email: decodedToken.email
      },
    });

    if (!data) {
      return res.status(401).json({
        messgae: "잘못된 요청입니다",
      });
    }

    await userRepo.update({
        email: decodedToken.email,
      }, {
        emailReq: true,
    });

    return res.status(200).sendFile('mailCheck.html', {
      'root': 'src/public/mail',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}