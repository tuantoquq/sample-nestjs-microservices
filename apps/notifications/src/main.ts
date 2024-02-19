import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  /* Validators Pipe */
  app.useGlobalPipes(new ValidationPipe());

  /* Logger */
  app.useLogger(app.get(Logger));

  /* Cookies parser */
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const tcpPort = configService.get('PORT');
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URI')],
      queue: 'notifications',
    },
  });
  await app.startAllMicroservices();
  app.get(Logger).log(`Notifications app running on tcp port ${tcpPort}`);
}
bootstrap();
