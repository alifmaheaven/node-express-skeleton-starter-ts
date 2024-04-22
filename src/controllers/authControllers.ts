import { Request, Response} from 'express';
import { v4 as uuidv4 } from "uuid";

//config
import pool from "../config/database";
// interfaces
import UsersInterfaces from '../interfaces/UsersInterfaces';


export default class Autentications {
  public async register(req: Request, res: Response): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    // get only data inside head of table
    const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    // result geting data inside head of table
    let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => fields?.fields.map(({name})=> name).includes(key) && value));
    // custom setup
    get_only_data_inside_head_of_table = {
      ...get_only_data_inside_head_of_table,
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
      return result?.rows[0];
    } catch (error) {
      console.log('Register error', error);
      const err = error as { column: string, message: string };
      throw {
        [err.column]: err.message
      };
    }
  }

  public async login(req: Request, res: Response): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    const { email, password } = req.body;
    const query = `SELECT * FROM ${DB_NAME} WHERE email = $1 AND password = $2`;
    const values = [email, password];
    try {
      const result = await pool?.query(query, values);
      return result?.rows[0];
    } catch (error) {
      console.log('Login error', error);
      throw error;
    }
  }

  public async logout(req: Request, res: Response): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    const { uuid } = req.body;
    const query = `UPDATE ${DB_NAME} SET is_login = false WHERE uuid = $1 RETURNING * `;
    try {
      const result = await pool?.query(query, [uuid]);
      return result?.rows[0];
    } catch (error) {
      console.log('Logout error', error);
      throw error;
    }
  }

  public async profile(req: Request, res: Response): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    const { uuid } = req.body;
    const query = `SELECT * FROM ${DB_NAME} WHERE uuid = $1`;
    try {
      const result = await pool?.query(query, [uuid]);
      return result?.rows[0];
    } catch (error) {
      console.log('Profile error', error);
      throw error;
    }
  }
}