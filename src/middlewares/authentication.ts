require('dotenv').config();

import * as express from "express";
import * as jwt from "jsonwebtoken";
// utils
import response from '../utils/response';

export async function JWTAuthentication(
  req: express.Request & { token?: string, auth_data?: any },
  res: express.Response,
  next: express.NextFunction
){
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    const secret_key = process.env.SCREET_KEY || "secret";
    req.token = bearerToken as string;
    await jwt.verify(req.token, secret_key, async (err, auth_data) => {
      if (err) {
        console.log('JWTAuthentication error', err);
        response.unauthorized('Session expired!', null, res);
      } else {
        req.auth_data = auth_data;
        next();
      }
    });
  } else {
    response.unauthorized('Authorization not found', null, res);
  }
}