import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  // Create a new Nest application instance
  const app = await NestFactory.create(AppModule);

  // ValidationPipe is a pipe that uses the class-validator library to automatically validate incoming requests.
  app.useGlobalPipes(
    new ValidationPipe({
      // When set to true, the ValidationPipe will automatically remove any properties that do not have a corresponding validation decorator.
      whitelist: true,
    })
  );
  await app.listen(process.env.PORT ?? 5500);
}
bootstrap();
