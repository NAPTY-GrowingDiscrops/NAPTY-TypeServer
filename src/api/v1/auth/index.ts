import { Router } from 'express';

import register from './auth.Ctrl/register';

const router = Router();

router.post('/register', register);

export default router;