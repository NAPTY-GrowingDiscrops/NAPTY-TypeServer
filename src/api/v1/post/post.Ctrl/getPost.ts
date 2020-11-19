import { Response } from 'express';
import { getRepository } from 'typeorm';
import moment from 'moment';

import AuthRequest from '../../../../type/AuthRequest';
import encrypt from '../../../../lib/encrypt';
import User from '../../../../entity/User';
import Post from '../../../../entity/Post';
import View from '../../../../entity/View';
import Comment from '../../../../entity/Comment';
import Recomment from '../../../../entity/Recomment';
import PostLike from '../../../../entity/PostLike';
import PostHate from '../../../../entity/PostHate';
import { flattenDiagnosticMessageText } from 'typescript';

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  type PostInfo = {
    idx: number;
    user_id: string;
    user_name: string;
    title: string;
    content: string;
    view: number;
    created_at: Date;
    liked?: Boolean;
    likeCount?: number;
    hated?: Boolean;
    hateCount?: number;
    modifyPost?: Boolean;
    deletePost?: Boolean;
  }

  try {
    const postRepo = getRepository(Post);
    const viewRepo = getRepository(View);
    const commentRepo = getRepository(Comment);
    const RecommentRepo = getRepository(Recomment);
    const PostLikeRepo = getRepository(PostLike);
    const PostHateRepo = getRepository(PostHate);

    const post: PostInfo = await postRepo.findOne({
      where: {
        idx,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "없는 게시글 입니다",
      });
    }

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (Array.isArray(ip)) {
        ip = ip[0];
    }

    const encryptIp = encrypt(ip);

    const viewed = await postRepo.findOne({
      where: {
        post_idx: post.idx,
        ip: encryptIp,
      },
      order: {
        'created_at': 'DESC',
      },
    });

    const currentTime = moment();

    if (!viewed || (viewed && currentTime.diff(moment(viewed.created_at), 'minute') > 60 )) {
      post.view += 1;

      await postRepo.save(post);

      const view = new View();

      view.ip = encryptIp;
      view.post_idx = idx;
      viewRepo.save(view);
    }

    const comment: Comment[] = await commentRepo.find({
      where: {
        post_idx: idx,
      }, order: {
        created_at: "DESC",
      }
    });

    const recomment: Recomment[] = await RecommentRepo.find({
      where: {
        post_idx: idx,
      }, order: {
        created_at: "DESC",
      },
    });

    const postLike: PostLike[] = await PostLikeRepo.find({
      where: {
        post_idx: idx,
      },
    });

    post.liked = false;
    if (user) {
      for (const pl of postLike) {
        if (pl.user_id == user.id) {
          post.liked = true;
          break;
        }
      }
    }
    post.likeCount = postLike.length;

    const postHate = await PostHateRepo.find({
      where: {
        post_idx: idx,
      },
    });

    post.hated = false;
    if (user) {
      for (const ph of postHate) {
        if (ph.user_id == user.id) {
          post.hated = true;
          break;
        }
      }
    }
    post.hateCount = postHate.length;

    if (user) {
      if (user.id === post.user_id) {
        post.modifyPost = true;
        post.deletePost = true;
      } else {
        post.modifyPost = false;
        post.deletePost = false;
      }
    } else {
        post.modifyPost = false;
        post.deletePost = false;
    }

    return res.status(200).json({
      message: "게시글 불러오기 성공",
      post,
      comment,
      recomment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "서버 오류",
    });
  }
}