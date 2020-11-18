import { Router } from 'express';

import register from './auth.Ctrl/register';
import mailCheck from './auth.Ctrl/mailCheck';
import login from './auth.Ctrl/login';

const router = Router();

router.post('/login', login);

router.post('/register', register);
router.post('/register/mailCheck', mailCheck);

export default router;