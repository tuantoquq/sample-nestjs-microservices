import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  /* Validators Pipe */
  app.useGlobalPipes(new ValidationPipe());

  /* Logger */
  app.useLogger(app.get(Logger));

  /* Cookies parser */
  app.use(cookieParser());

  /* Microservices */
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });

  const port = configService.get('HTTP_PORT');
  await app.startAllMicroservices();
  await app.listen(port);
  app.get(Logger).log(`Auth app running on port ${port}`);
}
bootstrap();
