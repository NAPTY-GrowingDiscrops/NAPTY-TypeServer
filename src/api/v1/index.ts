import { Router } from 'express';

import auth from './auth';
import post from './post';
import comment from './comment';
import recomment from './recomment';

const router = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/comment', comment);
router.use('/recomment', recomment);

export default router;