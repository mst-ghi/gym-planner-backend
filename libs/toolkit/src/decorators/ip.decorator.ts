import { createParamDecorator } from '@nestjs/common';

export const Ip = createParamDecorator((_, req) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
