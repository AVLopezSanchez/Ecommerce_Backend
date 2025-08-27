// import { Controller, Post, Body, Headers, HttpCode, Get } from '@nestjs/common';
// import { MercadopagoService } from './mercadopago.service';
// import { CreatePreferenceDto } from './Dto/createPreference.dto';

// @Controller('mercadopago')
// export class MercadopagoController {
//   constructor(private readonly mercadopagoService: MercadopagoService) {}

//   @Post('create-preference')
//   async createPreference(@Body() createPreferenceDto: CreatePreferenceDto) {
//     return this.mercadopagoService.createPreference(createPreferenceDto);
//   }

//   @Post('webhook')
//   @HttpCode(200)
//   async handleWebhook(
//     @Body() data: any,
//     @Headers('x-signature') signature: string,
//   ) {
//     return this.mercadopagoService.handleWebhook(data, signature);
//   }

//   @Post('payment')
//   async getPayment(@Body('paymentId') paymentId: string) {
//     return this.mercadopagoService.getPayment(paymentId);
//   }

//   @Get('health')
//   async healthCheck() {
//     return this.mercadopagoService.healthCheck();
//   }
// }
