import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { TransformInterceptor } from '../interceptors';

export const ClassSerializerProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};

export const TransformProvider = {
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
};
