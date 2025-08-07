import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions:{
      enableImplicitConversion: true
    }
  }));

const swaggerDoc =   new DocumentBuilder()
  .setTitle('Mini Resize Image API')
  .setDescription('API documentation for the Mini Resize Image project')
  .setVersion('1.0')
  .build();

  const documentSwagger = SwaggerModule.createDocument(app, swaggerDoc);

  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
