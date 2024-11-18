import { NestExpressApplication } from '@nestjs/platform-express';
import { ForbiddenExceptionFilter } from './forbidden-exception.filter';
import { InternalExceptionFilter } from './internal-exception.filter';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';

export class UseGlobalFilters {
  static use(app: NestExpressApplication, showInternalFilter = false) {
    if (showInternalFilter) {
      app.useGlobalFilters(new InternalExceptionFilter());
    }
    app.useGlobalFilters(new ForbiddenExceptionFilter());
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
  }
}
