import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Supprime les propriétés qui ne sont pas dans le DTO
    forbidNonWhitelisted: true, // Rejette la requête si des champs inconnus sont envoyés
    transform: true, // Transforme les types automatiquement (ex: string en number) pour se protéger contre les données malformées
  }));

  app.enableShutdownHooks();

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || '*',
    credentials: true,
  });
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);

  // Gestion des signaux d'arrêt pour libérer le port proprement
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
  
  process.on('SIGINT', async () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
