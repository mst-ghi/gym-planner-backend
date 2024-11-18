import { IsOptional, ValidateIf } from 'class-validator';

export const IsEmptyOptional = () => {
  return function (target: any, propertyKey: string) {
    ValidateIf((e) => e === '')(target, propertyKey);
    IsOptional()(target, propertyKey);
  };
};
