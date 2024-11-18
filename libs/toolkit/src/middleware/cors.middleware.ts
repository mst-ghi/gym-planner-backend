import { NestExpressApplication } from '@nestjs/platform-express';

export class UseCorsConfig {
  static use(
    app: NestExpressApplication,
    options = {
      allowedHeaders: '*',
      origin: '*',
      methods: '*',
      credentials: true,
    },
  ) {
    app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });

    app.enableCors(options);
  }
}
