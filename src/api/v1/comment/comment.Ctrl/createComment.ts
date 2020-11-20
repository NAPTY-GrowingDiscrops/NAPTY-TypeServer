import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import Comment from '../../../../entity/Comment';
import Post from '../../../../entity/Post';
import User from '../../../../entity/User';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  type CommentData = {
    post_idx: number;
    user_id: string;
    user_name: string;
    content: string;
  };

  try {
    const CommentRepo = getRepository(Comment);
    const PostRepo = getRepository(Post);

    const post = await PostRepo.findOne({
      where: {
        idx: idx,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "없는 게시글입니다",
      });
    }

    const comment: CommentData = {
      post_idx: idx,
      user_id: user.id,
      user_name: user.name,
      content: req.body.content,
    };

    await CommentRepo.save(comment);

    console.log("댓글 작성 성공!");
    return res.status(200).json({
      message: "댓글 장성 성공!",
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
} 