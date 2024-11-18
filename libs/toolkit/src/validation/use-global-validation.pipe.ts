import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { Validation } from './validation.pipe';

export class UseGlobalValidationPipe {
  static use(app: NestExpressApplication) {
    app.useGlobalPipes(
      new Validation({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
      }),
    );
  }
}
