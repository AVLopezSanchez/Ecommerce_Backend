import { config as configDotenv } from 'dotenv';

configDotenv({ path: '../.env' });

export const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.AUTH0_SECRET,
};
