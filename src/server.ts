import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import config from './config/config';
import cors from 'cors';

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(config.application.cookieSignatureSecret));
  app.use(cors({ credentials: true }));

  app.use('/', routes);

  return app;
}

