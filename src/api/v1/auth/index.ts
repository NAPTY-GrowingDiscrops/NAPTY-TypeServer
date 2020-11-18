import { Router } from 'express';

import login from './auth.Ctrl/login';
import register from './auth.Ctrl/register';
import mailCheck from './auth.Ctrl/mailCheck';
import nameCheck from './auth.Ctrl/nameCheck';
import pwNormalization from './auth.Ctrl/pwNormalization';

const router = Router();

router.post('/login', login);

router.post('/register', register);
router.post('/register/mailCheck', mailCheck);
router.post('/register/nameCheck', nameCheck);
router.post('/register/pwNormalization', pwNormalization);

export default router;