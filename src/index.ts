import 'dotenv/config';
import config from './config/config';
import { createServer } from './server';
import mongoose from 'mongoose';

const app = createServer();

const port = config.application.port;
const connectionString = config.database.connectionString;

app
  .listen(port, async () => {
    console.log(`Server is up and listening on port ${port}`);

    try {
      await mongoose.connect(connectionString);
      console.log('Database connection successful');
    } catch (err) {
      console.error('Error connecting to DB.', err);
    }
  })
  .on('error', (err) => {
    console.error('Error starting the server.', err);
  });

