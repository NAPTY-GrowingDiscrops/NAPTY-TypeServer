import { Router } from 'express';

import AuthMiddleWare from '../../../lib/MiddleWare/auth';
import createRecomment from './recomment.Ctrl/createRecomment';
import modifyRecomment from './recomment.Ctrl/modifyRecomment';
import deleteRecomment from './recomment.Ctrl/deleteRecomment';

const router = Router();

router.post('/:comment_idx', AuthMiddleWare.loginCheck, createRecomment); // 댓글의 idx
router.put('/:recomment_idx', AuthMiddleWare.loginCheck, modifyRecomment); // 답글의 idx
router.delete('/:recomment_idx', AuthMiddleWare.loginCheck, deleteRecomment); // 답글의 idx

export default router;