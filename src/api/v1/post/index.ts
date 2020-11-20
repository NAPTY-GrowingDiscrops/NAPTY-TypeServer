import { Router } from 'express';

import authMiddleWare from '../../../lib/MiddleWare/auth';
import createPost from './post.Ctrl/createPost';
import getPost from './post.Ctrl/getPost';
import getPosts from './post.Ctrl/getPosts';
import deletePost from './post.Ctrl/deletePost';

const router = Router();

router.post('/', authMiddleWare.loginCheck, createPost);

router.get('/:idx', authMiddleWare.guestCheck, getPost);
router.get('/', authMiddleWare.guestCheck, getPosts);

router.delete('/:idx', authMiddleWare.loginCheck, deletePost);

export default router;