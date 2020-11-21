import { Response } from 'express';
import { getRepository } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import User from '../../../../entity/User';
import Recomment from '../../../../entity/Recomment';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.recomment_idx);

  try {
    const recommentRepo = await getRepository(Recomment);

    const recomment: Recomment = await recommentRepo.findOne({
      where: {
        idx,
      },
    });

    if (!recomment) {
      return res.status(404).json({
        message: "존재하지않는 답글입니다",
      });
    }

    if (recomment.user_id != user.id) {
      return res.status(409).json({
        message: "자신의 답글이 아닙니다",
      });
    }

    await recommentRepo.remove(recomment);

    console.log("답글 삭제 완료");
    return res.status(200).json({
      messae: "답글 삭제 완료",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}