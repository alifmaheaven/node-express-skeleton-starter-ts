require('dotenv').config();

import express, { Application, Request, Response } from 'express';
import path from 'path'
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import * as middlewares from './middlewares/global';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';


const app : Application = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);
app.use('/public', express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/public/swagger.json',
    },
  }),
);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
