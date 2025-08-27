"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoWebhookException = exports.MercadoPagoNotFoundException = exports.MercadoPagoTimeoutException = exports.MercadoPagoBadRequestException = exports.MercadoPagoUnauthorizedException = exports.MercadoPagoException = void 0;
const common_1 = require("@nestjs/common");
class MercadoPagoException extends common_1.HttpException {
    constructor(message, status = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        super(`MercadoPago Error: ${message}`, status);
    }
}
exports.MercadoPagoException = MercadoPagoException;
class MercadoPagoUnauthorizedException extends MercadoPagoException {
    constructor(message = 'Invalid or expired access token') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.MercadoPagoUnauthorizedException = MercadoPagoUnauthorizedException;
class MercadoPagoBadRequestException extends MercadoPagoException {
    constructor(message = 'Invalid request to MercadoPago API') {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.MercadoPagoBadRequestException = MercadoPagoBadRequestException;
class MercadoPagoTimeoutException extends MercadoPagoException {
    constructor(message = 'Timeout connecting to MercadoPago') {
        super(message, common_1.HttpStatus.REQUEST_TIMEOUT);
    }
}
exports.MercadoPagoTimeoutException = MercadoPagoTimeoutException;
class MercadoPagoNotFoundException extends MercadoPagoException {
    constructor(message = 'Payment not found') {
        super(message, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.MercadoPagoNotFoundException = MercadoPagoNotFoundException;
class MercadoPagoWebhookException extends MercadoPagoException {
    constructor(message = 'Invalid webhook signature') {
        super(message, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.MercadoPagoWebhookException = MercadoPagoWebhookException;
//# sourceMappingURL=mercadopago.exeptions.js.map