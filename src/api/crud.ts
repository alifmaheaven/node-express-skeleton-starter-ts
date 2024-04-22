import { Router, Request, Response} from 'express';
import { v4 as uuidv4 } from "uuid";

import pagination from '../utils/pagination';
import response from '../utils/response';

import pool from "../config/database";

const router = Router();

router.get<{}, {}>('/', async (req: Request, res: Response) => {
  const DB_NAME = "rooms";
  try {
    const result = await pagination(req, res, DB_NAME, pool);
    response.ok("Successfuly get data!", result, res);
  } catch (error) {
    console.log('Get data error', error);
    response.bad("Error", error, res);
  }
});

router.post<{}, {}>('/', async (req: Request, res: Response) => {
  const DB_NAME = "rooms";
  // get only data inside head of table
  const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
  // result geting data inside head of table
  let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => fields?.fields.map(({name})=> name).includes(key) && value));
  // custom setup
  get_only_data_inside_head_of_table = {
    ...get_only_data_inside_head_of_table,
    // user_id: req.auth_data.uuid,
    room_code: Math.floor(100000 + Math.random() * 900000),
    uuid: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
  }
  // make me query insert as get_only_data_inside_head_of_table
  const keys = Object.keys(get_only_data_inside_head_of_table);
  const values = Object.values(get_only_data_inside_head_of_table);
  const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
  const query = `INSERT INTO ${DB_NAME} (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

  try {
    const result = await pool?.query(query, values);
    response.ok("Create data success!", result?.rows[0], res);
  } catch (error) {
    console.log('Create data error', error);
    const err = error as { column: string, message: string };
    response.bad("Create data error!", {
      [err.column]: err.message
    }, res);
  }
});

router.put<{}, {}>('/', async (req: Request, res: Response) => {
  const DB_NAME = "rooms";
  const { uuid } = req.body;
  // get only data inside head of table
  const fields = await pool!.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
  // result geting data inside head of table
  let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => fields?.fields.map(({name})=> name).includes(key) && value));
  // custom setup
  get_only_data_inside_head_of_table = {
    ...get_only_data_inside_head_of_table,
    updated_at: new Date(),
  }
  // delete uuid
  delete get_only_data_inside_head_of_table.uuid;
  // make me query insert as get_only_data_inside_head_of_table
  const keys = Object.keys(get_only_data_inside_head_of_table);
  const values = Object.values(get_only_data_inside_head_of_table);
  const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
  const query = `UPDATE ${DB_NAME} SET (${keys.join(', ')}) = (${placeholders.join(', ')}) WHERE uuid = $${keys.length + 1} RETURNING *`;

  try {
    const result = await pool!.query(query, [...values, uuid]);
    return response.ok("Update data success!", result.rows[0], res);
  } catch (error) {
    console.log('Update data error', error);
    const err = error as { column: string, message: string };
    return response.bad("Error", {
      [err.column]: err.message
    }, res);
  }
});

router.delete<{}, {}>('/', async (req: Request, res: Response) => {
  const DB_NAME = "rooms";
  const { uuid } = req.body;
  const query = `UPDATE ${DB_NAME} SET is_active = false WHERE uuid = $1 RETURNING *`;
  const values = [uuid];

  try {
    const result = await pool!.query(query, values);
    response.ok("Delete data success!", result.rows[0], res);
  } catch (error) {
    console.log('Delete data error', error);
    const err = error as { column: string, message: string };
    response.bad("Error", {
      [err.column]: err.message
    }, res);
  }
});



export default router;
