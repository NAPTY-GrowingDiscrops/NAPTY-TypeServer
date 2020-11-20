import { Response } from 'express';
import { getRepository, Like } from 'typeorm';

import AuthRequest from '../../../../type/AuthRequest';
import Post from '../../../../entity/Post';
import PostLike from '../../../../entity/PostLike';
import PostHate from '../../../../entity/PostHate';

export default async (req: AuthRequest, res: Response) => {
  type PostInfo = {
    idx: number;
    user_id: string;
    user_name: string;
    title: string;
    content: string;
    view: number;
    likeCount?: number;
    hateCount?: number;
  };

  try {
    const postRepo = getRepository(Post);
    const postLikeRepo = getRepository(PostLike);
    const postHateRepo = getRepository(PostHate);

    const posts: PostInfo[] = await postRepo.find({
      order: {
        created_at: 'DESC',
      },
    });

    for (const post of posts) {
      const postLike: PostLike[] = await postLikeRepo.find({
        where: {
          post_idx: post.idx,
        },
      });

      post.likeCount = postLike.length;
    }

    for (const post of posts) {
      const postHate: PostHate[] = await postHateRepo.find({
        where: {
          post_idx: post.idx,
        },
      });

      post.hateCount = postHate.length;
    }

    return res.status(200).json({
      message: "게시글 목록 불러오기 성공!",
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}