import { Router } from 'express';

import authMiddleWare from '../../../lib/MiddleWare/auth'
import createComment from './comment.Ctrl/createComment';

const router = Router();

router.post('/:idx', authMiddleWare.loginCheck, createComment);

export default router;