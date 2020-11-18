import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../../../entity/User';

export default async (req: Request, res: Response) => {
  type RequestBody = {
    name: string;
  };

  const { name }: RequestBody = req.body; 

  try {
    const userRepo = getRepository(User);

    if (name.length > 7) {
      return res.status(403).json({
        message: "닉네임은 7자리 이하여야 합니다.",
      });
    }

    const isExist: User = await userRepo.findOne({
      where: {
        name,
      },
    });

    if (isExist) {
      console.log('이미 있는 닉네임 입니다.');
      return res.status(401).json({
        message: "이미 있는 닉네임 입니다",
      });
    }

    console.log("사용할 수 있는 닉네임");
    return res.status(200).json({
      message: "사용할 수 있는 닉네임 입니다",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류", 
    });
  }
}