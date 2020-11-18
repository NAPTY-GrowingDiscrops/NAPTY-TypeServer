import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../../../entity/User';

export default async (req: Request, res: Response) => {
  type RequestBody = {
    email: string;
  };

  const { email }: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);
    const isExist: User = await userRepo.findOne({
      where: {
        email,
      },
    });

    if(isExist) {
       console.log('중복된 이메일입니다');
       return res.status(401).json({
         message: "중복된 email입니다.",
       });
    }
    
    console.log('사용할 수 있는 email입니다');
    return res.status(200).json({
      message: "사용할 수 있는 email입니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}
