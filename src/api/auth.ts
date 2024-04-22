import express from 'express';
import { Request, Response} from 'express';

// controllers
import Autentications from '../controllers/authControllers';

// utils
import response from '../utils/response';

const router = express.Router();

router.post('/login', async (req: Request, res:Response) => {
  try {
    const result = await new Autentications().login(req, res);
    response.ok('Login success', result, res);
  } catch (error) {
    response.bad('Login error', error, res);
  }
});

router.post('/register', async (req: Request, res:Response) => {
  try {
    const result = await new Autentications().register(req, res);
    response.ok('Register success', result, res);
  } catch (error) {
    response.bad('Register error', error, res);
  }
});

router.get<{}, {}>('/profile', async (req: Request, res:Response) => {
  try {
    const result = await new Autentications().profile(req, res);
    response.ok('Profile success', result, res);
  } catch (error) {
    response.bad('Profile error', error, res);
  }
});

export default router;

