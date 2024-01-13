import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://frontend-todo-nextjs.vercel.app',
    ],
  });
  app.use(cookieParser());
  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       secure: true,
  //     },
  //     value: (req: Request) => {
  //       return req.header('csrf-token');
  //     },
  //   }),
  // );

  const port = process.env.PORT || 3005;
  console.log(`--------------------------------`);
  console.log(`Backend server port: ${port}`);
  console.log(`--------------------------------`);
  await app.listen(port);
}
bootstrap();
