/* eslint-disable prettier/prettier */
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));

  const config = new DocumentBuilder()
                .setTitle("nestjsprisma")
                .setDescription("nestjsprisma")
                .setVersion("1.0")
                .addBearerAuth()
                .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);

  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
