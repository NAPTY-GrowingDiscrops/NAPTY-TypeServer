import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../../../entity/User';
import { verifyToken } from '../../../../lib/token';

export default async (req: Request, res: Response) => {
  type RequestBody = {
    token: string
  };

  const { token }: RequestBody = req.body;

  try {
    const decodedToken = await verifyToken(token);
    const userRepo = getRepository(User);
    const data: User = await userRepo.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    if (!data) {
      return res.status(401).json({
        messgae: "토큰을 잘못 입력하였습니다.",
      });
    }

    console.log("이메일 인증이 되지 않은 계정입니다.");
    if (data.emailReq === false) {
      return res.status(401).json({
        message: "이메일 인증이 되지 않은 계정입니다.",
      });
    }

    console.log("이메일 인증이 완료된 계정입니다");
    return res.status(200).json({
      message: "이메일 인증이 완료된 계정입니다!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      messgae: "서버 오류",
    });
  }
}