import { Router } from 'express';

import login from './auth.Ctrl/login';
import register from './auth.Ctrl/register';
import mailCheck from './auth.Ctrl/mailCheck';
import nameCheck from './auth.Ctrl/nameCheck';
import pwNormalization from './auth.Ctrl/pwNormalization';
import verifyCheck from './auth.Ctrl/verifyCheck';
import mailSend from './auth.Ctrl/mailSend';

const router = Router();

router.post('/login', login);
router.post('/login/verifyCheck', verifyCheck);

router.post('/register', register);
router.post('/register/mailCheck', mailCheck);
router.post('/register/nameCheck', nameCheck);
router.post('/register/pwNormalization', pwNormalization);

router.post('/email/mailSend', mailSend);

export default router;