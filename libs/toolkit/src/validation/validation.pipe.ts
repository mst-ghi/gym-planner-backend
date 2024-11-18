import {
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
  UnprocessableEntityException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';

export class Validation extends ValidationPipe {
  constructor(private options: ValidationPipeOptions) {
    super(options);
  }

  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const res: any = {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'The submitted data is not valid',
          errors: [],
        };

        const response: any = e.getResponse();

        response.message.forEach(async (el: any) => {
          res.errors.push({
            field: el.property,
            message: el,
          });
        });

        throw new UnprocessableEntityException(res);
      }
    }
  }
}
