import { Router } from 'express';

import authMiddleWare from '../../../lib/MiddleWare/auth'
import createComment from './comment.Ctrl/createComment';
import modifyComment from './comment.Ctrl/modifyComment';
import deleteComment from './comment.Ctrl/deleteComment';

const router = Router();

router.post('/:idx', authMiddleWare.loginCheck, createComment);
router.put('/:idx', authMiddleWare.loginCheck, modifyComment);
router.delete('/:idx', authMiddleWare.loginCheck, deleteComment);

export default router;