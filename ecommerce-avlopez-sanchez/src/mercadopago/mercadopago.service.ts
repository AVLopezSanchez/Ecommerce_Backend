// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import {
//   Injectable,
//   Inject,
//   Logger,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { ConfigType } from '@nestjs/config';
// import { firstValueFrom, timeout, catchError } from 'rxjs';
// import { CreatePreferenceDto } from './Dto/createPreference.dto';
// import mercadopagoConfig from '../config/mercadopago.config';
// import {
//   MercadoPagoUnauthorizedException,
//   MercadoPagoBadRequestException,
//   MercadoPagoTimeoutException,
//   MercadoPagoNotFoundException,
//   MercadoPagoWebhookException,
//   MercadoPagoException,
// } from '../utils/mercadopago.exeptions';

// @Injectable()
// export class MercadopagoService {
//   private readonly logger = new Logger(MercadopagoService.name);
//   private readonly requestTimeout = 15000; // 15 segundos

//   constructor(
//     private readonly httpService: HttpService,
//     @Inject(mercadopagoConfig.KEY)
//     private readonly config: ConfigType<typeof mercadopagoConfig>,
//   ) {
//     this.validateConfiguration();
//   }

//   private validateConfiguration() {
//     if (!this.config.accessToken) {
//       throw new InternalServerErrorException(
//         'MercadoPago access token is not configured',
//       );
//     }

//     if (
//       !this.config.accessToken.startsWith('TEST-') &&
//       !this.config.accessToken.startsWith('APP_USR-')
//     ) {
//       this.logger.warn('Access token format may be invalid');
//     }

//     this.logger.log('MercadoPago Service initialized');
//     this.logger.debug(`Base URL: ${this.config.baseUrl}`);
//     this.logger.debug(
//       `Environment: ${this.config.accessToken.startsWith('TEST-') ? 'Sandbox' : 'Production'}`,
//     );
//   }

//   private getHeaders() {
//     return {
//       Authorization: `Bearer ${this.config.accessToken}`,
//       'Content-Type': 'application/json',
//       'User-Agent': 'NestJS-MercadoPago-Integration/1.0',
//     };
//   }

//   private handleApiError(error: any, context: string) {
//     this.logger.error(`${context} error:`, {
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });

//     if (error.response) {
//       switch (error.response.status) {
//         case 400:
//           throw new MercadoPagoBadRequestException(
//             error.response.data?.message || 'Invalid request parameters',
//           );
//         case 401:
//           throw new MercadoPagoUnauthorizedException(
//             error.response.data?.message || 'Invalid credentials',
//           );
//         case 404:
//           throw new MercadoPagoNotFoundException(
//             error.response.data?.message || 'Resource not found',
//           );
//         case 429:
//           throw new MercadoPagoException(
//             'Too many requests to MercadoPago API',
//             429,
//           );
//         default:
//           throw new MercadoPagoException(
//             `MercadoPago API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
//             error.response.status,
//           );
//       }
//     }

//     if (error.code === 'ECONNABORTED' || error.name === 'TimeoutError') {
//       throw new MercadoPagoTimeoutException();
//     }

//     if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
//       throw new MercadoPagoException(
//         'Cannot connect to MercadoPago API. Please check your network connection.',
//         HttpStatus.SERVICE_UNAVAILABLE,
//       );
//     }

//     throw new MercadoPagoException(
//       `Unexpected error: ${error.message}`,
//       HttpStatus.INTERNAL_SERVER_ERROR,
//     );
//   }

//   async createPreference(createPreferenceDto: CreatePreferenceDto) {
//     const { title, quantity, unit_price, currency_id, description } =
//       createPreferenceDto;

//     const preference = {
//       items: [
//         {
//           title: title.substring(0, 256), // Limitar longitud
//           quantity: Math.max(1, quantity), // Mínimo 1
//           unit_price: Math.max(0, unit_price), // Mínimo 0
//           currency_id: currency_id || 'ARS',
//           description: description ? description.substring(0, 500) : undefined,
//         },
//       ],
//       back_urls: {
//         success: this.config.successUrl,
//         failure: this.config.failureUrl,
//         pending: this.config.pendingUrl,
//       },
//       auto_return: 'approved',
//       notification_url: `${this.config.baseUrl}/webhooks/mercadopago`,
//       statement_descriptor: 'TIENDA_AR', // Máx 22 chars para Argentina
//       binary_mode: true, // Evita estados pendientes
//     };

//     try {
//       this.logger.log('Creating payment preference...');
//       this.logger.debug(`Preference data: ${JSON.stringify(preference)}`);

//       const response = await firstValueFrom(
//         this.httpService
//           .post(`${this.config.baseUrl}/checkout/preferences`, preference, {
//             headers: this.getHeaders(),
//             timeout: this.requestTimeout,
//           })
//           .pipe(
//             timeout(this.requestTimeout),
//             catchError((error) => {
//               throw this.handleApiError(error, 'Create preference');
//             }),
//           ),
//       );

//       this.logger.log('Preference created successfully');
//       this.logger.debug(`Preference ID: ${response.data.id}`);

//       return {
//         success: true,
//         data: {
//           id: response.data.id,
//           init_point: response.data.init_point,
//           sandbox_init_point: response.data.sandbox_init_point,
//           date_created: response.data.date_created,
//         },
//       };
//     } catch (error) {
//       // Si ya es una excepción de MercadoPago, la relanzamos
//       if (error instanceof MercadoPagoException) {
//         throw error;
//       }

//       // Para errores inesperados
//       this.logger.error('Unexpected error in createPreference:', error);
//       throw new MercadoPagoException(
//         'Failed to create payment preference',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async getPayment(paymentId: string) {
//     if (!paymentId || paymentId.length < 5) {
//       throw new MercadoPagoBadRequestException('Invalid payment ID');
//     }

//     try {
//       this.logger.log(`Fetching payment: ${paymentId}`);

//       const response = await firstValueFrom(
//         this.httpService
//           .get(`${this.config.baseUrl}/v1/payments/${paymentId}`, {
//             headers: this.getHeaders(),
//             timeout: this.requestTimeout,
//           })
//           .pipe(
//             timeout(this.requestTimeout),
//             catchError((error) => {
//               throw this.handleApiError(error, 'Get payment');
//             }),
//           ),
//       );

//       this.logger.log(`Payment ${paymentId} fetched successfully`);
//       return this.formatPaymentResponse(response.data);
//     } catch (error) {
//       if (error instanceof MercadoPagoException) {
//         throw error;
//       }

//       this.logger.error('Unexpected error in getPayment:', error);
//       throw new MercadoPagoException(
//         'Failed to fetch payment information',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   private formatPaymentResponse(payment: any) {
//     return {
//       id: payment.id,
//       status: payment.status,
//       status_detail: payment.status_detail,
//       transaction_amount: payment.transaction_amount,
//       currency_id: payment.currency_id,
//       date_created: payment.date_created,
//       date_approved: payment.date_approved,
//       payer: {
//         email: payment.payer?.email,
//         identification: payment.payer?.identification,
//       },
//       payment_method: {
//         id: payment.payment_method_id,
//         type: payment.payment_type_id,
//       },
//       metadata: payment.metadata,
//     };
//   }

//   async handleWebhook(data: any, signature: string) {
//     try {
//       // Verificar la firma del webhook
//       if (!this.verifyWebhookSignature(signature)) {
//         throw new MercadoPagoWebhookException();
//       }

//       if (!data || !data.type) {
//         throw new MercadoPagoBadRequestException('Invalid webhook data');
//       }

//       const { type, data: webhookData } = data;

//       this.logger.log(`Received webhook type: ${type}`);

//       if (type === 'payment') {
//         if (!webhookData?.id) {
//           throw new MercadoPagoBadRequestException(
//             'Payment ID missing in webhook',
//           );
//         }

//         const payment = await this.getPayment(webhookData.id);
//         return this.processPayment(payment);
//       }

//       return {
//         status: 'success',
//         message: 'Webhook received but no action taken',
//         type,
//       };
//     } catch (error) {
//       if (error instanceof MercadoPagoException) {
//         throw error;
//       }

//       this.logger.error('Unexpected error in handleWebhook:', error);
//       throw new MercadoPagoException(
//         'Failed to process webhook',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   private verifyWebhookSignature(signature: string): boolean {
//     // Implementar verificación de firma según documentación de MP
//     // Esta es una implementación básica - debes seguir la doc oficial
//     if (!this.config.webhookSecret) {
//       this.logger.warn(
//         'Webhook secret not configured, skipping signature verification',
//       );
//       return true; // O false dependiendo de tu política de seguridad
//     }

//     return signature === this.config.webhookSecret;
//   }

//   private processPayment(payment: any) {
//     const baseResponse = {
//       paymentId: payment.id,
//       amount: payment.transaction_amount,
//       currency: payment.currency_id,
//       status: payment.status,
//     };

//     switch (payment.status) {
//       case 'approved':
//         this.logger.log(`Payment ${payment.id} approved`);
//         return {
//           ...baseResponse,
//           message: 'Pago aprobado correctamente',
//           action: 'complete_order',
//         };
//       case 'rejected':
//         this.logger.warn(
//           `Payment ${payment.id} rejected: ${payment.status_detail}`,
//         );
//         return {
//           ...baseResponse,
//           message: `Pago rechazado: ${payment.status_detail}`,
//           action: 'notify_customer',
//         };
//       case 'in_process':
//         this.logger.log(`Payment ${payment.id} in process`);
//         return {
//           ...baseResponse,
//           message: 'Pago pendiente de revisión',
//           action: 'wait',
//         };
//       case 'pending':
//         this.logger.log(`Payment ${payment.id} pending`);
//         return {
//           ...baseResponse,
//           message: 'Pago pendiente',
//           action: 'wait',
//         };
//       default:
//         this.logger.warn(
//           `Payment ${payment.id} has unknown status: ${payment.status}`,
//         );
//         return {
//           ...baseResponse,
//           message: `Estado de pago desconocido: ${payment.status}`,
//           action: 'review',
//         };
//     }
//   }

//   // Método adicional para verificar salud del servicio
//   async healthCheck() {
//     try {
//       const response = await firstValueFrom(
//         this.httpService
//           .get(`${this.config.baseUrl}/v1/payments`, {
//             headers: this.getHeaders(),
//             params: { limit: 1 },
//             timeout: 10000,
//           })
//           .pipe(
//             timeout(10000),
//             catchError((error) => {
//               throw this.handleApiError(error, 'Health check');
//             }),
//           ),
//       );

//       return {
//         status: 'healthy',
//         timestamp: new Date().toISOString(),
//         environment: this.config.accessToken.startsWith('TEST-')
//           ? 'sandbox'
//           : 'production',
//       };
//     } catch (error) {
//       throw new MercadoPagoException(
//         'MercadoPago service is unavailable',
//         HttpStatus.SERVICE_UNAVAILABLE,
//       );
//     }
//   }
// }
