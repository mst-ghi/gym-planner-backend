import { Logger } from '@nestjs/common';

export const errorLogger = (message: string, context?: string) => {
  Logger.error(message, context);
};
