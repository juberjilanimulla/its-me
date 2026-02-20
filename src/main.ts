import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const dataSource = app.get(DataSource);
  if(dataSource.isInitialized){
    console.log('Database connection successfully');
  }else{
    console.error('Unable to Connect Database');
  }
  await app.listen(process.env.PORT || 4000);
  console.log(`Application running on port ${process.env.PORT || 4000}`);
}
bootstrap();
 