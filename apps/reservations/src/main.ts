import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get(ConfigService);

  /* Validators Pipe */
  app.useGlobalPipes(new ValidationPipe());

  /* Logger */
  app.useLogger(app.get(Logger));

  /* Cookies parser */
  app.use(cookieParser());

  const port = configService.get('HTTP_PORT');
  await app.listen(port);
  app.get(Logger).log(`Reservations app running on port ${port}`);
}
bootstrap();
