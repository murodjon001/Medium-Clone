import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { CustomHttpExceptionFilter } from './infrastucture/interceptors/custom-http-exception.interceptor';
import { LoggingInterceptor } from './infrastucture/interceptors/logging.interceptors';
import { ResponseTransformerInterceptor } from './infrastucture/interceptors/response.interceptor';
import { PrismaService } from './infrastucture/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });
  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalFilters(new CustomHttpExceptionFilter());

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformerInterceptor(),
  );

  const prismaService = app.get(PrismaService);
  prismaService.runMigrations();

  await app.listen(process.env.PORT);
}
bootstrap();
