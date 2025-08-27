import { HttpException, HttpStatus } from '@nestjs/common';
export declare class MercadoPagoException extends HttpException {
    constructor(message: string, status?: HttpStatus);
}
export declare class MercadoPagoUnauthorizedException extends MercadoPagoException {
    constructor(message?: string);
}
export declare class MercadoPagoBadRequestException extends MercadoPagoException {
    constructor(message?: string);
}
export declare class MercadoPagoTimeoutException extends MercadoPagoException {
    constructor(message?: string);
}
export declare class MercadoPagoNotFoundException extends MercadoPagoException {
    constructor(message?: string);
}
export declare class MercadoPagoWebhookException extends MercadoPagoException {
    constructor(message?: string);
}
