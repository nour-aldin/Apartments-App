import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from your cloud storage directory
  // Assuming your cloudStorageService saves files to a local directory
  app.useStaticAssets(join(process.cwd(), 'images'), {
    prefix: '/images/',
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  swagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Apartment-App')
    .setDescription('Apartment-App API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
