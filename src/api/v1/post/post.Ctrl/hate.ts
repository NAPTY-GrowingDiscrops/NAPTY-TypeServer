import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import User from '../../../../entity/User';
import Hate from '../../../../entity/PostHate';

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
    const postHateRepo = getRepository(Hate);

    const isExist = await postHateRepo.findOne({
      where: {
        post_idx: idx,
        user_id: user.id,
      },
    });

    if (isExist) {
      return res.status(409).json({
        message: "이미 싫어요를 눌렀습니다",
      });
    }

    await postHateRepo.save(data);
    console.log("싫어요 성공!");
    return res.status(200).json({
      message: "싫어요 성공!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}