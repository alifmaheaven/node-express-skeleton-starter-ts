import express from 'express';

import auth from './auth';
import crud from './crud';

// Import each module (assumes each exports an Express router)
import access from './access';
import attendance from './attendance';
import company from './company';
import contract from './contract';
import device from './device';
import evidence from './evidence';
import evidence_group from './evidenceGroup';
import location from './location';
import permission from './permission';
import role from './role';
import service from './service';
import severity from './severity';
import site from './site';
import status from './status';
import ticket from './ticket';
import users from './users';

import response from '../utils/response';

const router = express.Router();

router.get<{}, {}>('/', (req, res) => {
  response.ok('Welcome to Emoji API', {
    message: 'API - 👋🌎🌍🌏',
  }, res);
});

// Base routes
router.use('/auth', auth);
router.use('/crud', crud);

// Auto-mounted routes
router.use('/access', access);
router.use('/attendance', attendance);
router.use('/company', company);
router.use('/contract', contract);
router.use('/device', device);
router.use('/evidence', evidence);
router.use('/evidence-group', evidence_group);
router.use('/location', location);
router.use('/permission', permission);
router.use('/role', role);
router.use('/service', service);
router.use('/severity', severity);
router.use('/site', site);
router.use('/status', status);
router.use('/ticket', ticket);
router.use('/users', users);

export default router;
