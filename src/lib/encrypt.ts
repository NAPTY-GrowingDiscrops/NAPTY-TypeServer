import crypto from 'crypto';

import { ENCRYPT_SECRET } from '../config/Secret';

const encrypt = (text) => {
  const encrypt = crypto
    .createHmac('sha256', ENCRYPT_SECRET)
    .update(text)
    .digest('hex');

  return encrypt
}

export default encrypt;