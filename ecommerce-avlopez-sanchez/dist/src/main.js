"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const without_password_interceptor_1 = require("./Interceptors/without-password.interceptor");
const express_openid_connect_1 = require("express-openid-connect");
const auth0_config_1 = require("./config/auth0.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_openid_connect_1.auth)(auth0_config_1.config));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce M4 Backend')
        .setDescription('Esta es una Api construida para el Backend M4 de Henry')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api2', app, document);
    app.useGlobalInterceptors(new without_password_interceptor_1.WithoutPasswordInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map