import { Router } from 'express';

import auth from './auth';
import post from './post';
import comment from './comment';

const router = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/comment', comment);

export default router;