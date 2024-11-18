import { Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { sha3_256 } from 'js-sha3';

export const catchLogger = (error, model: string) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    Logger.error(`${model}: code ${error.code}`, `Prisma Seeding`);
  } else {
    Logger.error(error.message, `Prisma ${model} Seeding`);
  }
};

export const stringToHash = (str: string): string => {
  return sha3_256(sha3_256(str));
};
