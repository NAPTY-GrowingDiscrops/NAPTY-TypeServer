import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import Post from '../../../../entity/Post';
import User from '../../../../entity/User';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  try {
    const postRepo = getRepository(Post);

    const post: Post = await postRepo.findOne({
      where: {
        idx,
      },
    });

    if(!post) {
      return res.status(404).json({
        message: "없는 게시글 입니다",
      });
    }

    if (!(post.user_id === user.id)) {
      return res.status(403).json({
        message: "삭제하려는 게시물이 자신의 것이 아닙니다",
      });
    }

    await postRepo.remove(post);

    console.log("게시글 삭제 완료!");
    return res.status(200).json({
      message: "게시글 삭제 완료!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}