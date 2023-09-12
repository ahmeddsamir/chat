import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
const session = require('express-session');


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(
    session({
      secret: 'bw8fueb7832',
      resave: false,
      saveUninitialized: false,
    },
    ),
  );
  await app.listen(3000);
}
bootstrap();

declare module 'express-session' {
  interface SessionData {
    token?: string;
  }
}
