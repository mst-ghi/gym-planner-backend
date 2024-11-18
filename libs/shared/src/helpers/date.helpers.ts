import * as dayjs from 'dayjs';
import { OpUnitType, QUnitType } from 'dayjs';

export const addDate = (value: number, type: dayjs.ManipulateType = 'h') => {
  return dayjs().add(value, type).toISOString();
};

export const calcBirthDateTo = (date: string, unit: QUnitType | OpUnitType = 'year') => {
  return dayjs().diff(dayjs(date), unit);
};
