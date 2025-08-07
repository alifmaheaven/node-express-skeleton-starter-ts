import { config } from 'dotenv';
config();

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
  Security,
  UploadedFiles,
} from 'tsoa';
import { v4 as uuidv4 } from 'uuid';

import pagination from '../utils/pagination';
import { moveToPermanentFiles, deleteFiles } from '../utils/filesManagement';

import pool from '../config/database';

import {
  TicketInterfaces,
  TicketCreateInterfaces,
  TicketUpdateInterfaces,
  TicketDeleteInterfaces,
  TicketFilterInterfaces,
  TicketUploadDeleteInterfaces,
} from '../interfaces/TicketInterfaces';

import PaginationInterfaces from '../interfaces/PaginationInterfaces';

@Route('/api/v1/ticket')
@Tags('Ticket')
export default class TicketController extends Controller {
  @Security('bearer')
  @Get('/')
  public async getData(
    @Request() req: any,
    @Queries() query: any,
  ): Promise<PaginationInterfaces> {
    const DB_NAME = 'ticket';
    try {
      const result = await pagination(query, DB_NAME, pool);
      return result;
    } catch (error) {
      console.log('Get data error', error);
      throw error;
    }
  }

  @Security('bearer')
  @Post('/')
  public async createData(
    @Request() req: any,
    @Body() requestBody: TicketCreateInterfaces,
  ): Promise<TicketInterfaces> {
    const DB_NAME = 'ticket';
    const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    const data = {
      ...Object.fromEntries(
        Object.entries(requestBody).filter(
          ([key, value]) => fields?.fields.map(({ name }) => name).includes(key) && value,
        ),
      ),
      user_id: req.auth_data.id,
      id: uuidv4(),
    };

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);
    const query = `INSERT INTO ${DB_NAME} (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

    try {
      const result = await pool?.query(query, values);
      return result?.rows[0];
    } catch (error) {
      console.log('Create data error', error);
      const err = error as { column: string; message: string };
      throw { [err.column]: err.message };
    }
  }

  @Security('bearer')
  @Put('/')
  public async updateData(
    @Request() req: any,
    @Body() requestBody: TicketUpdateInterfaces,
  ): Promise<TicketInterfaces> {
    const DB_NAME = 'ticket';
    const { id } = requestBody;
    const fields = await pool?.query(`SELECT * FROM ${DB_NAME} WHERE 1=0`);
    const data = {
      ...Object.fromEntries(
        Object.entries(requestBody).filter(
          ([key, value]) => fields?.fields.map(({ name }) => name).includes(key) && value,
        ),
      ),
      updated_at: new Date(),
    };

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);
    const query = `UPDATE ${DB_NAME} SET ${keys
      .map((key, i) => `${key} = ${placeholders[i]}`)
      .join(', ')} WHERE id = $${keys.length + 1} RETURNING *`;

    try {
      const result = await pool?.query(query, [...values, id]);
      return result?.rows[0];
    } catch (error) {
      console.log('Update data error', error);
      const err = error as { column: string; message: string };
      throw { [err.column]: err.message };
    }
  }

  @Security('bearer')
  @Delete('/')
  public async deleteData(
    @Request() req: any,
    @Body() requestBody: TicketDeleteInterfaces,
  ): Promise<TicketInterfaces> {
    const DB_NAME = 'ticket';
    const { id } = requestBody;
    const query = `DELETE FROM ${DB_NAME} WHERE id = $1 RETURNING *`;

    try {
      const result = await pool?.query(query, [id]);
      return result?.rows[0];
    } catch (error) {
      console.log('Delete data error', error);
      throw error;
    }
  }

  @Security('bearer')
  @Post('/upload')
  public async uploadFile(
    @UploadedFiles() files: any,
  ): Promise<any> {
    return {
      links: files.files.map((item: { path: any }) => ({
        path: '/' + item.path,
        link: files.protocol + '://' + files.host + '/' + item.path,
      })),
    };
  }

  @Security('bearer')
  @Delete('/upload')
  public async deleteFile(
    @Request() req: any,
    @Body() requestBody: TicketUploadDeleteInterfaces,
  ): Promise<any> {
    requestBody.links.forEach((link) => {
      deleteFiles(link);
    });
    return {
      links: requestBody.links,
    };
  }
}
