import express from 'express';

import auth from './auth';
import crud from './crud';

import response from '../utils/response';

const router = express.Router();

router.get<{}, {}>('/', (req, res) => {
  response.ok('Welcome to Emoji API', {
    message: 'API - 👋🌎🌍🌏',
  }, res);
});

router.use('/auth', auth);
router.use('/crud', crud);

export default router;
