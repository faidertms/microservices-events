import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiValidationPipe } from './shared/api-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ApiValidationPipe());
  await app.listen(3000);
}
bootstrap();
