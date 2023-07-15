import { createServer } from "./server";

const app = createServer();

const port = 4000;

app
  .listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
  })
  .on('error', (err) => {
    console.error('Error starting the server.', err);
  });

