import { Router, Request, Response} from 'express';

// controllers
import Crud from '../controllers/crudControllers';

// utils
import response from '../utils/response';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await new Crud().getData(req.query);
    response.ok('Get data success', result, res);
  } catch (error) {
    response.error('Get data error', error, res);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await new Crud().createData(req.body);
    response.ok('Create data success', result, res);
  } catch (error) {
    response.error('Create data error', error, res);
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const result = await new Crud().updateData(req.body);
    response.ok('Update data success', result, res);
  } catch (error) {
    response.error('Update data error', error, res);
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const result = await new Crud().deleteData(req.body);
    response.ok('Delete data success', result, res);
  } catch (error) {
    response.error('Delete data error', error, res);
  }
});



export default router;
