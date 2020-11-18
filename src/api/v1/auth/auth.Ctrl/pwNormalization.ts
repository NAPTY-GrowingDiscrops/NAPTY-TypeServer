import bodyParser from 'body-parser';
import { Request, Response } from 'express';

const pwCheck = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export default async (req: Request, res: Response) => {
  if (!req.body.pw) {
    return res.status(401).json({
      message: "비밀번호를 입력하지 않았습니다", 
    });
  }

  try {
    if (!(pwCheck.test(req.body.pw))) {
      return res.status(403).json({
        message: "알맞은 비밀번호 형식이 아닙니다",
      });
    }

    return res.status(200).json({
      message: "사용할 수 있는 비밀번호",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}