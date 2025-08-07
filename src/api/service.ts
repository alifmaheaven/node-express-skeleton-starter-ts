import { Router, Request, Response } from 'express';
import Service from '../controllers/serviceControllers';
import { JWTAuthentication } from '../middlewares/authentication';
import upload from '../config/upload';
import response from '../utils/response';

const router = Router();

router.get('/', JWTAuthentication, async (req: Request, res: Response) => {
  try {
    const result = await new Service().getData(req, req.query);
    response.ok('Get data success', result, res);
  } catch (error) {
    response.error('Get data error', error, res);
  }
});

router.post('/', JWTAuthentication, async (req: Request, res: Response) => {
  try {
    const result = await new Service().createData(req, req.body);
    response.ok('Create data success', result, res);
  } catch (error) {
    response.error('Create data error', error, res);
  }
});

router.put('/', JWTAuthentication, async (req: Request, res: Response) => {
  try {
    const result = await new Service().updateData(req, req.body);
    response.ok('Update data success', result, res);
  } catch (error) {
    response.error('Update data error', error, res);
  }
});

router.delete('/', JWTAuthentication, async (req: Request, res: Response) => {
  try {
    const result = await new Service().deleteData(req, req.body);
    response.ok('Delete data success', result, res);
  } catch (error) {
    response.error('Delete data error', error, res);
  }
});

router.post('/upload', JWTAuthentication, upload.array('files'), async (req: Request, res: Response) => {
  try {
    const result = await new Service().uploadFile(req);
    response.ok('Upload file success', result, res);
  } catch (error) {
    response.error('Upload file error', error, res);
  }
});

router.delete('/upload', JWTAuthentication, async (req: Request, res: Response) => {
  try {
    const result = await new Service().deleteFile(req, req.body);
    response.ok('Delete file success', result, res);
  } catch (error) {
    response.error('Delete file error', error, res);
  }
});

export default router;
