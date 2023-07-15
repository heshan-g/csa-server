import express from 'express';

export const createServer = () => {
  const app = express();

  app.use('/health-check', (_, res) => res.send('Server is healthy'));

  return app;
}

