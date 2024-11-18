import { sha3_256 } from 'js-sha3';
import toSlug from 'slugify';

export const stringToHash = (str: string): string => {
  return sha3_256(sha3_256(str));
};

export const randomStr = (length, prefix = '') => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + result;
};

export const slugify = (str: string, separator = '-') => {
  return toSlug(str, separator);
};

export const entityPartial = <T>(partial: T, entity: any) => {
  return new entity(partial);
};

export const getSearchRgx = (search: string) => {
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  return rgx(search);
};
