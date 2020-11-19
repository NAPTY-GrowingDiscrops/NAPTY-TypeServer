import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import Post from '../../../../entity/Post';
import User from '../../../../entity/User';

export default async (req: AuthRequest, res:Response) => {
  const user: User = req.user;

  type RequestBody = {
    user_id: string;
    user_name: string;
    title: string;
    content: string;
  }
  
  const data: RequestBody = {
    user_id: user.id,
    user_name: user.name,
    title: req.body.title,
    content: req.body.content,
  };

  try {

    if (!user) {
      return res.status(401).json({
        message: "먼저 로그인을 해주세요!",
      });
    }

    const postRepo = getRepository(Post);
    await postRepo.save(data);

    console.log("게시물 게시 성공!");
    return res.status(200).json({
      message: "게시물 게시 겅공!",
    });
  }catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}