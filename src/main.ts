import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  morgan.token('remote-addr',(req:any)=>{
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  });
  app.use(
     morgan(
    ':remote-addr - :method :url :status :res[content-length] - :response-time ms'
  )
);
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
  await app.listen(process.env.PORT || 3000);
  console.log(`Application running on port ${process.env.PORT || 3000}`);
}
bootstrap();
 