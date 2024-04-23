import express, { Application, Request, Response } from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app : Application = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
