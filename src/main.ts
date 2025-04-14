import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
