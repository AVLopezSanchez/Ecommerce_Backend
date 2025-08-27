import { HttpException, HttpStatus } from '@nestjs/common';

export class MercadoPagoException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(`MercadoPago Error: ${message}`, status);
  }
}

export class MercadoPagoUnauthorizedException extends MercadoPagoException {
  constructor(message = 'Invalid or expired access token') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class MercadoPagoBadRequestException extends MercadoPagoException {
  constructor(message = 'Invalid request to MercadoPago API') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class MercadoPagoTimeoutException extends MercadoPagoException {
  constructor(message = 'Timeout connecting to MercadoPago') {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}

export class MercadoPagoNotFoundException extends MercadoPagoException {
  constructor(message = 'Payment not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class MercadoPagoWebhookException extends MercadoPagoException {
  constructor(message = 'Invalid webhook signature') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
