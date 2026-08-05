import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // necesary for cookies
  });

  const usersService = app.get(UsersService);

  // Health check endpoint
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', async (req, res) => {
    try {
      const isConnected = await usersService.ping();
      res.json({
        status: isConnected ? 'ok' : 'error',
        database: isConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        database: 'disconnected',
        message: error.message,
      });
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
