import { config } from 'dotenv';
config();

import * as Express from 'express';

import { 
  Controller,
  Tags,
  Route,
  Get,
  Queries,
  Request,
  Post,
  Put,
  Delete,
  Body,
  UploadedFiles,
  FormField,
  Security,
} from 'tsoa';
import { v4 as uuidv4 } from 'uuid';

// utils
import pagination from '../utils/pagination';
//config
import pool from '../config/database';
// import interfaces
import { 
  RoomsInterfaces, 
  RoomsUpdateInterfaces,
  RoomsCreateInterfaces,
  RoomsDeleteInterfaces,
  RoomsFilterInterfaces,  
} from '../interfaces/RoomsInterfaces';

import PaginationInterfaces from '../interfaces/PaginationInterfaces';

@Route('/api/v1/crud')
@Tags('User')
export default class Crud extends Controller {
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   */
  @Security('bearer')
  @Get('/')
  public async getData(
    @Request() req: any,
      @Queries() query: RoomsFilterInterfaces,
  ): Promise<PaginationInterfaces> {
    const DB_NAME = 'rooms';
    try {
      const result = await pagination(query, DB_NAME, pool);
      return result; // Add this line
    } catch (error) {
      console.log('Get data error', error);
      throw error; // Add this line
    }
  }

  @Security('bearer')
  @Post('/')
  public async createData(
    @Request() req: any,
      @Body() requestBody: RoomsCreateInterfaces,
  ): Promise<RoomsInterfaces> {
    const DB_NAME = 'rooms';
    // get only data inside head of table
    const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    // result geting data inside head of table
    let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(requestBody).filter(([key, value]) => fields?.fields.map(({ name })=> name).includes(key) && value));
    // custom setup
    get_only_data_inside_head_of_table = {
      ...get_only_data_inside_head_of_table,
      user_id: req.auth_data.uuid,
      room_code: Math.floor(100000 + Math.random() * 900000),
      uuid: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
    };
    // make me query insert as get_only_data_inside_head_of_table
    const keys = Object.keys(get_only_data_inside_head_of_table);
    const values = Object.values(get_only_data_inside_head_of_table);
    const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
    const query = `INSERT INTO ${DB_NAME} (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

    try {
      const result = await pool?.query(query, values);
      return result?.rows[0]; // Add this line
    } catch (error) {
      console.log('Create data error', error);
      const err = error as { column: string, message: string };
      throw {
        [err.column]: err.message,
      }; // Add this line
    }
  }

  @Security('bearer')
  @Put('/')
  public async updateData(
    @Request() req: any,
      @Body() requestBody: RoomsUpdateInterfaces,
  ): Promise<RoomsInterfaces> {
    const DB_NAME = 'rooms';
    const { uuid } = requestBody;
    // get only data inside head of table
    const fields = await pool!.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    // result geting data inside head of table
    let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(requestBody).filter(([key, value]) => fields?.fields.map(({ name })=> name).includes(key) && value));
    // custom setup
    get_only_data_inside_head_of_table = {
      ...get_only_data_inside_head_of_table,
      updated_at: new Date(),
    };
    // make me query insert as get_only_data_inside_head_of_table
    const keys = Object.keys(get_only_data_inside_head_of_table);
    const values = Object.values(get_only_data_inside_head_of_table);
    const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
    const query = `UPDATE ${DB_NAME} SET ${keys.map((key, i) => `${key} = ${placeholders[i]}`).join(', ')} WHERE uuid = $${keys.length + 1} RETURNING *`;
    try {
      const result = await pool?.query(query, [...values, uuid]);
      return result?.rows[0]; // Add this line
    } catch (error) {
      console.log('Update data error', error);
      const err = error as { column: string, message: string };
      throw {
        [err.column]: err.message,
      }; // Add this line
    }
  }

  @Security('bearer')
  @Delete('/')
  public async deleteData(
    @Request() req: any,
      @Body() requestBody: RoomsDeleteInterfaces,
  ): Promise<RoomsInterfaces> {
    const DB_NAME = 'rooms';
    const { uuid } = requestBody;
    const query = `DELETE FROM ${DB_NAME} WHERE uuid = $1 RETURNING *`;
    try {
      const result = await pool?.query(query, [uuid]);
      return result?.rows[0]; // Add this line
    } catch (error) {
      console.log('Delete data error', error);
      throw error; // Add this line
    }
  }

  @Security('bearer')
  @Post('/upload')
  public async uploadFile(
    @UploadedFiles() files: any,
    @FormField() body?: { destination: string }, // Update the type of the destination parameter
  ): Promise<any> {
    console.log('base url', files);
    
    return { 
      destination: body?.destination, 
      links: files.files.map((item: { path: any; }) => ({ path: '/'+item.path, link: files.protocol + "://" + files.host + '/'+item.path }))  
    };
  };
}