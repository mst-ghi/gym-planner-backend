import { sha3_256 } from 'js-sha3';
import toSlug from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const stringToHash = (str: string): string => {
  return sha3_256(sha3_256(str));
};

export const randomStr = (
  length,
  prefix = '',
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) => {
  let result = '';
  const characters = chars;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + result;
};

export const slugify = (str: string, separator = '-'): string => {
  return toSlug(str, separator);
};

export const uuid = (): string => {
  return uuidv4();
};

export const isValidEmail = (email?: string) => {
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  var parts = email.split('@');
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split('.');
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
};
