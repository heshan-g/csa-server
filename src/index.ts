import 'dotenv/config';
import config from "./config/config";
import { createServer } from "./server";

const app = createServer();

const port = config.application.port;

app
  .listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
  })
  .on('error', (err) => {
    console.error('Error starting the server.', err);
  });

