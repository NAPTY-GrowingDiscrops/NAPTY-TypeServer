import { Router } from 'express';

import authMiddleWare from '../../../lib/MiddleWare/auth'
import createComment from './comment.Ctrl/createComment';
import modifyComment from './comment.Ctrl/modifyComment';

const router = Router();

router.post('/:idx', authMiddleWare.loginCheck, createComment);
router.put('/:idx', authMiddleWare.loginCheck, modifyComment);

export default router;