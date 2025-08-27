import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';

configDotenv({ path: '../.env' });

export default registerAs('mercadopago', () => ({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  baseUrl: process.env.MERCADOPAGO_BASE_URL,
  webhookSecret: process.env.MERCADOPAGO_WEBHOOK_SECRET,
  successUrl: process.env.MERCADOPAGO_SUCCESS_URL,
  failureUrl: process.env.MERCADOPAGO_FAILURE_URL,
  pendingUrl: process.env.MERCADOPAGO_PENDING_URL,
}));
