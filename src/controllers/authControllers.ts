require('dotenv').config();

import {
  Controller,
  Tags,
  Route,
  Get,
  Request,
  Post,
  Body,
  Security,
} from 'tsoa';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//config
import pool from '../config/database';
// interfaces
import {
  RegisterInterfaces,
  LoginInterfaces,
  ResponseAuthInterfaces,
  ProfileAuthInterfaces,
} from '../interfaces/AutenticationsInterfaces';
import { UsersInterfaces } from '../interfaces/UsersInterfaces';

@Route('/api/v1/auth')
@Tags('Auth')
export default class Autentications extends Controller {
  @Post('/register')
  public async register(
    @Request() req: any,
      @Body() requestBody: RegisterInterfaces,
  ): Promise<UsersInterfaces> {
    const DB_NAME = 'users';
    // get only data inside head of table
    const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    console.log('fields', fields?.fields);
    
    // result geting data inside head of table
    let get_only_data_inside_head_of_table = Object.fromEntries(
      Object.entries(requestBody).filter(
        ([key, value]) =>
          fields?.fields.map(({ name }) => name).includes(key) && value,
      ),
    );

    // generate random string all capital 8 digits
    var random_password = [...Array(8)].map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

    console.log('first attemt', get_only_data_inside_head_of_table);
    

    
    // custom setup
    get_only_data_inside_head_of_table = {
      ...get_only_data_inside_head_of_table,
      password: await bcrypt.hash(get_only_data_inside_head_of_table.password || '', 10),
      id: uuidv4(),
    };
    // make me query insert as get_only_data_inside_head_of_table
    const keys = Object.keys(get_only_data_inside_head_of_table);
    const values = Object.values(get_only_data_inside_head_of_table);
    const placeholders = Array.from(
      { length: keys.length },
      (_, i) => `$${i + 1}`,
    );
    const query = `INSERT INTO ${DB_NAME} (${keys.join(
      ', ',
    )}) VALUES (${placeholders.join(', ')}) RETURNING *`;
    
    try {
      const result = await pool?.query(query, values);
      return result?.rows[0];
    } catch (error) {
      console.log('Register error', error);
      const err = error as { column: string; message: string };
      throw {
        [err.column]: err.message,
      };
    }
  }

  @Post('/login')
  public async login(
    @Request() req: any,
      @Body() requestBody: LoginInterfaces,
  ): Promise<ResponseAuthInterfaces> {
    const { email, password } = requestBody;
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    try {
      const result = await pool!.query(query, values);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(
          password || '',
          user.password || '',
        );

        console.log(password, user.password);
        
        if (isMatch) {
          const expired_token = parseInt(
            process.env.EXPIRED_TOKEN || '3600',
          ).toString();
          const secret_key = process.env.SCREET_KEY || 'secret';
          const token = jwt.sign({ id: user.id }, secret_key, {
            expiresIn: parseInt(expired_token),
          });
          return { token };
        } else {
          throw { password: 'Password not match!' };
        }
      } else {
        throw { username: 'Username not found!' };
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('/logout')
  public async logout(
    @Request() req: any,
      @Body() requestBody: UsersInterfaces,
  ): Promise<UsersInterfaces> {
    const DB_NAME = 'users';
    const { id } = requestBody;
    const query = `UPDATE ${DB_NAME} SET is_login = false WHERE id = $1 RETURNING * `;
    try {
      const result = await pool?.query(query, [id]);
      return result?.rows[0];
    } catch (error) {
      console.log('Logout error', error);
      throw error;
    }
  }

  @Security('bearer')
  @Get('/profile')
  public async profile(@Request() req: any): Promise<ProfileAuthInterfaces> {
    const DB_NAME = 'users';
    const { id } = req.auth_data;
    const query = `SELECT * FROM ${DB_NAME} WHERE id = $1`;
    try {
      const result = await pool?.query(query, [id]);
      return result?.rows[0];
    } catch (error) {
      console.log('Profile error', error);
      throw error;
    }
  }
}
