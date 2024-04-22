import { config } from "dotenv";
config();

import express from 'express';

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "../config/database";

import response from '../utils/response';

const router = express.Router();

// router.get<{}, {}>('/', (req, res) => {
//   response.ok('Welcome to Emoji API', ['😀', '😳', '🙄'], res);
// });


router.post<{}, {}>('/login', async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = $1`;
  const values = [username];

  try {
    const result = await pool!.query(query, values);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const secret_key = process.env.SCREET_KEY || ""; // Provide a default value for the secret key
        const expired_token = process.env.EXPIRED_TOKEN || "10000"; // Provide a default value for the expired token
        const token = jwt.sign({ uuid: user.uuid }, secret_key, {
          expiresIn: parseInt(expired_token),
        });
        response.ok("Login success", { token: token }, res);
      } else {
        response.bad("Password wrong!", { password: "Password wrong!" }, res);
      }
    } else {
      response.bad(
        "Username not found!",
        { username: "Username not found!" },
        res
      );
    }
  } catch (error) {
    response.bad("Error", error, res);
  }
});

router.post<{}, {}>('/register', async (req, res) => {
  // get only data inside head of table
  const fields = await pool!.query(`SELECT * FROM users WHERE 1=0`);
  // result geting data inside head of table
  let get_only_data_inside_head_of_table = Object.fromEntries(Object.entries(req.body).filter(([key]) => fields.fields.map(({name})=> name).includes(key))) as any;
  // custom setup
  get_only_data_inside_head_of_table = {
    ...get_only_data_inside_head_of_table,
    uuid: uuidv4(),
    password: await bcrypt.hash(get_only_data_inside_head_of_table?.password, 8),
  }
  // make me query insert as get_only_data_inside_head_of_table
  const keys = Object.keys(get_only_data_inside_head_of_table);
  const values = Object.values(get_only_data_inside_head_of_table);
  const placeholders = Array.from({ length: keys.length }, (_, i) => `$${i + 1}`);
  const query = `INSERT INTO users (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

  try {
    const result = await pool!.query(query, values);

    response.ok("Register success", result.rows[0], res);
  } catch (error) {
    console.log('error Register Users',error);
    response.bad("Error", error, res);
  }
});

router.get<{}, {}>('/profile', async (req, res) => {
  // const { uuid } = req.auth_data;
  const query = `SELECT * FROM users WHERE uuid = $1`;
  // const values = [uuid];
  const values = ['1'];

  try {
    const result = await pool!.query(query, values);
    response.ok("Profile", result.rows[0], res);
  } catch (error) {
    response.bad("Error", error, res);
  }
});

export default router;

