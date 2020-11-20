import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import User from '../../../../entity/User';
import Post from '../../../../entity/Post';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  type RequestBody = {
    title: string;
    content: string; 
  };

  const data: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    
    const post: Post = await postRepo.findOne({
      where: {
        idx,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "없는 게시글입니다",
      });
    }

    if (!(post.user_id == user.id)) {
      return res.status(409).json({
        message: "자신의 게시글이 아닙니다",
      });
    }
    
    post.title = data.title;
    post.content = data.content;
    
    await postRepo.save(post);

    return res.status(200).json({
      message: "게시글 수정 완료",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}