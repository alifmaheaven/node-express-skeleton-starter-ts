
import { 
  Controller,
  Tags,
  Route,
  Get,
  Path,
  Query,
  Queries,
  Request,
  Post,
  Put,
  Delete,
  Header,
  Body,
  Response
} from 'tsoa';

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//config
import pool from "../config/database";
// interfaces
import { RegisterInterfaces, LoginInterfaces, ResponseAuthInterfaces } from '../interfaces/AutenticationsInterfaces';
import { UsersInterfaces } from '../interfaces/UsersInterfaces';


@Route("/api/v1/auth")
@Tags("Auth")
export default class Autentications extends Controller{
  @Post("/register")
  public async register(
    @Body() requestBody: RegisterInterfaces
  ): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    // get only data inside head of table
    const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    // result geting data inside head of table
    let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(requestBody).filter(([key, value]) => fields?.fields.map(({name})=> name).includes(key) && value));
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
  @Post("/login")
  public async login(
    @Body() requestBody: LoginInterfaces
  ): Promise<ResponseAuthInterfaces> {
    const { email, username,password } = requestBody;
    const query = `SELECT * FROM users WHERE username = $1 or email = $2`;
    const values = [username, email];

    try {
      const result = await pool!.query(query, values);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password || '', user.password || '');
        if (isMatch) {
          const expired_token = (parseInt(process.env.EXPIRED_TOKEN || "3600")).toString();
          const secret_key = process.env.SCREET_KEY || "secret";
          const token = jwt.sign({ uuid: user.uuid }, secret_key, {
            expiresIn: expired_token,
          });
          return { token };
        } else {
          throw { password: "Password not match!" };
        }
      } else {
        throw { username: "Username not found!" };
      }
    } catch (error) {
      throw error;
    }
  }
  @Post("/logout")
  public async logout(
    @Body() requestBody: UsersInterfaces
  ): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    const { uuid } = requestBody;
    const query = `UPDATE ${DB_NAME} SET is_login = false WHERE uuid = $1 RETURNING * `;
    try {
      const result = await pool?.query(query, [uuid]);
      return result?.rows[0];
    } catch (error) {
      console.log('Logout error', error);
      throw error;
    }
  }

  @Post("/profile")
  public async profile(
    @Body() requestBody: UsersInterfaces
  ): Promise<UsersInterfaces> {
    const DB_NAME = "users";
    const { uuid } = requestBody;
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