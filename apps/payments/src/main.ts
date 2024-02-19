import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);

  /* Validators Pipe */
  app.useGlobalPipes(new ValidationPipe());

  /* Logger */
  app.useLogger(app.get(Logger));

  /* Cookies parser */
  app.use(cookieParser());

  const tcpPort = configService.get('PORT');
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URI')],
      queue: 'payments',
      noAck: false,
    },
  });
  await app.startAllMicroservices();
  app.get(Logger).log(`Payments app running on tcp port ${tcpPort}`);
}
bootstrap();
