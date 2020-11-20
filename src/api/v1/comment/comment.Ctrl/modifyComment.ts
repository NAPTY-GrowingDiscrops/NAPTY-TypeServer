import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import User from '../../../../entity/User';
import Comment from '../../../../entity/Comment';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);
  const reqContent: string = String(req.body.content);

  try {
    const commentRepo = getRepository(Comment);

    const comment: Comment = await commentRepo.findOne({
      where: {
        idx,
      },
    });

    if (!comment) {
      return res.status(404).json({
        message: "없는 댓글입니다",
      });
    }

    if (comment.user_id != user.id) {
      return res.status(409).json({
        message: "자신의 댓글이 아닙니다",
      });
    }

    comment.content = reqContent;
    await commentRepo.save(comment);

    console.log("댓글 수정 완료!");
    return res.status(200).json({
      message: "댓글 수정 완료!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}