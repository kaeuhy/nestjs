import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest.js API')
    .setDescription('Nest.js API')
    .setVersion('1.0')
    .addTag('service-name')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // http://localhost:3000/api
  SwaggerModule.setup('api', app, documentFactory);

  // 전역 필터 등록
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
