import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import User from '../../../../entity/User';
import encrypt from '../../../../lib/encrypt';

export default async (req: Request, res: Response) => {

  type RequestBody = {
    id: string;
    email: string;
    pw: string;
    name: string;
  };
  
  if (!(req.body.email) || !(req.body.pw) || !(req.body.name)) {
    return res.status(401).json({
      message: "하나라도 입력되지 않은 항목이 있습니다",
    });
  }

  const data: RequestBody = {
    id: uuidv4(),
    email: req.body.email,
    pw: encrypt(req.body.pw),
    name: req.body.name,
  };

  try {

    const userRepo = getRepository(User);
    await userRepo.save(data);

    console.log("회원가입 성공");
    return res.status(200).json({
      message: "회원가입 성공!",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }

}