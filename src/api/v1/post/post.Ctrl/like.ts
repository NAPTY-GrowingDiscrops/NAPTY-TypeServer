import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import User from '../../../../entity/User';
import Like from '../../../../entity/PostLike';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  type dataBody = {
    post_idx: number;
    user_id: string;
  }

  const data: dataBody = {
    post_idx: idx,
    user_id: user.id,
  }
  try {
    const postLikeRepo = getRepository(Like);

    const isExist = await postLikeRepo.findOne({
      where: {
        post_idx: idx,
        user_id: user.id,
      },
    });

    if (isExist) {
      return res.status(409).json({
        message: "이미 좋아요를 눌렀습니다",
      });
    }

    await postLikeRepo.save(data);
    return res.status(200).json({
      message: "좋아요 성공!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}