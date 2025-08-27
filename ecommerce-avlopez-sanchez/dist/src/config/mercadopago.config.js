"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)({ path: '../.env' });
exports.default = (0, config_1.registerAs)('mercadopago', () => ({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    baseUrl: process.env.MERCADOPAGO_BASE_URL,
    webhookSecret: process.env.MERCADOPAGO_WEBHOOK_SECRET,
    successUrl: process.env.MERCADOPAGO_SUCCESS_URL,
    failureUrl: process.env.MERCADOPAGO_FAILURE_URL,
    pendingUrl: process.env.MERCADOPAGO_PENDING_URL,
}));
//# sourceMappingURL=mercadopago.config.js.map