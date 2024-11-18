import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { json, urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

export const Helmet = helmet({
  crossOriginResourcePolicy: false,
});

export const Compression = compression();

export const Morgan = morgan((tokens: any, req: any, res: any) => {
  const method = tokens.method(req, res);
  const status = +tokens.status(req, res);
  const url = tokens.url(req, res);
  const time = tokens['response-time'](req, res);

  const log = `${method} | ${status} | ${time}ms | ${url}`;

  if (status >= 400 && status < 500) {
    Logger.warn(log, 'RequestLogger');
  } else if (status >= 500 && status < 600) {
    Logger.error(log, 'RequestLogger');
  } else {
    Logger.log(log, 'RequestLogger');
  }
});

const Json = json({ limit: '50mb' });

const Urlencoded = urlencoded({ extended: true, limit: '50mb' });

export class UseMainMiddlewares {
  static use(app: NestExpressApplication) {
    app.use(Helmet);
    app.use(Compression);
    app.use(Morgan);
    app.use(Json);
    app.use(Urlencoded);
  }
}
