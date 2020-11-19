import { Router } from 'express';

import authMiddleWare from '../../../lib/MiddleWare/auth';
import createPost from './post.Ctrl/createPost';
import deletePost from './post.Ctrl/deletePost';

const router = Router();

router.post('/', authMiddleWare, createPost);
router.delete('/:idx', authMiddleWare, deletePost);

export default router;