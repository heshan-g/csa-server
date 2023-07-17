const config = {
  application: {
    port: parseInt(process.env.PORT as string),
    accessTokenExpiryInSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRY_IN_SECONDS as string),
    refreshTokenExpiryInSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRY_IN_SECONDS as string),
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    cookieSignatureSecret: process.env.COOKIE_SIGNATURE_SECRET as string,
  },
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING as string,
  },
}

export default config;

