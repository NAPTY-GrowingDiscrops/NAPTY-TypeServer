import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { createToken } from '../../../../config/token';
import User from '../../../../entity/User';
import encrypt from '../../../../config/encrypt';

export default async (req: Request, res: Response) => {
  type RequestBody = {
    email: string;
    pw: string;
  };

  const data: RequestBody = {
    email: req.body.email,
    pw: encrypt(req.body.pw),
  };

  try {
    const userRepo = getRepository(User);
    const isExist: User = await userRepo.findOne({
      where: {
        email: data.email,
        pw: data.pw,
      },
    });

    if (!isExist) {
      console.log('이메일과 비밀번호를 다시 확인해주세요');
      return res.status(401).json({
        message: "이메일과 비밀번호를 다시 확인해주세요",
      });
    }

    const token = await createToken(isExist.id);
    console.log("로그인 성공");
    return res.status(200).json({
      message: "로그인 성공",
      token: {
        token,
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}