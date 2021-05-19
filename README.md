# nest-custom-logger

## Usage

### Simple usage
```ts
import { Logger } from '@opengeekslab_llc/nest-custom-logger';

const logger = new Logger(!process.env.NODE_ENV)('Hello');
logger.log('World')
```

### Extended usage
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, requestLoggerMiddleware } from '@opengeekslab_llc/nest-custom-logger';

const port = 8000;

function CustomLogger(context: string) {
  return new Logger(!process.env.NODE_ENV)(context);
}

async function bootstrap() {
  const logger = CustomLogger('NEST');

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // use this middleware to show http logs in your console
  app.use(requestLoggerMiddleware);

  await app.listen(port);

  logger.log(`app is listening on port ${port}`);
}

bootstrap();
```

