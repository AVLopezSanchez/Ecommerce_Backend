import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WithoutPasswordInterceptor } from './Interceptors/without-password.interceptor';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(auth(auth0Config));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce M4 Backend')
    .setDescription('Esta es una Api construida para el Backend M4 de Henry')
    .setVersion('1.0')
    .addBearerAuth() //autentificacion por portador de token
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api2', app, document);

  app.useGlobalInterceptors(new WithoutPasswordInterceptor());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
