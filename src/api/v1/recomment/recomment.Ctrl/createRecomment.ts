import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import User from '../../../../entity/User';
import Comment from '../../../../entity/Comment';
import Recomment from '../../../../entity/Recomment';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.comment_idx);

  type RequestComment = {
    post_idx: number;
    comment_idx: number;
    user_id: string;
    user_name: string;
    content: string;
  };

  try {
    const CommentRepo = getRepository(Comment);
    const RecommentRepo = getRepository(Recomment);

    const comment: Comment = await CommentRepo.findOne({
      where: {
        idx: idx,
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "없는 댓글입니다",
      });
    }

    const reComment: RequestComment = {
      post_idx: comment.post_idx,
      comment_idx: comment.idx,
      user_id: user.id,
      user_name: user.name,
      content: req.body.content,
    };

    await RecommentRepo.save(reComment);
    console.log("답글 작성성공!");
    return res.status(200).json({
      message: "답글 작성 성공!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}