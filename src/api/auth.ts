import express from 'express';
import { Request, Response } from 'express';

// controllers
import Autentications from '../controllers/authControllers';

// middlewares
import { JWTAuthentication } from '../middlewares/authentication';

// utils
import response from '../utils/response';

const router = express.Router();

router.post('/login', async (req: Request, res:Response) => {
  try {
    const result = await new Autentications().login(req, req.body);
    response.ok('Login success', result, res);
  } catch (error) {
    response.bad('Login error', error, res);
  }
});

router.post('/register', async (req: Request, res:Response) => {
  try {
    
    const result = await new Autentications().register(req, req.body);
    response.ok('Register success', result, res);
  } catch (error) {
    response.bad('Register error', error, res);
  }
});

router.put('/update-profile', async (req: Request, res:Response) => {
  try {
    
    const result = await new Autentications().updateProfile(req, req.body);
    response.ok('Update success', result, res);
  } catch (error) {
    response.bad('Update error', error, res);
  }
});

router.get('/profile', JWTAuthentication, async (req: Request, res:Response) => {
  try {
    const result = await new Autentications().profile(req);
    response.ok('Profile success', result, res);
  } catch (error) {
    response.bad('Profile error', error, res);
  }
});

export default router;

