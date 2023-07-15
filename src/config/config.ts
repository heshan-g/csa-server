const config = {
  application: {
    port: parseInt(process.env.PORT as string),
  },
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING as string,
  },
}

export default config;

