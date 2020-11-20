import { Router } from 'express';

import authMiddleWare from '../../../lib/MiddleWare/auth';
import createPost from './post.Ctrl/createPost';
import getPost from './post.Ctrl/getPost';
import getPosts from './post.Ctrl/getPosts';
import findPosts from './post.Ctrl/findPosts';
import modifyPost from './post.Ctrl/modifyPost';
import deletePost from './post.Ctrl/deletePost';
import like from './post.Ctrl/like';

const router = Router();

router.post('/', authMiddleWare.loginCheck, createPost);
router.get('/:idx', authMiddleWare.guestCheck, getPost);
router.get('/', authMiddleWare.guestCheck, getPosts);
router.get('/find/:keyword', authMiddleWare.guestCheck, findPosts);
router.put('/:idx', authMiddleWare.loginCheck, modifyPost);
router.delete('/:idx', authMiddleWare.loginCheck, deletePost);

router.post('/like/:idx', authMiddleWare.loginCheck, like);

export default router;