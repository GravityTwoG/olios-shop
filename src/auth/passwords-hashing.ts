import * as crypto from 'crypto';

const SALT_LENGTH = 10;
const ITERATIONS = 10;
const HASH_LEN = 10;

function hashString(str: string, salt: string): string {
  return crypto
    .pbkdf2Sync(str, salt, ITERATIONS, HASH_LEN, 'sha512')
    .toString('hex');
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = hashString(password, salt);

  return `${salt}_${hash}`;
}

export function comparePasswords(
  hashedPassword: string,
  enteredPassword: string,
): boolean {
  const salt = hashedPassword.split('_')[0];
  if (!salt) return false;

  const hash = hashString(enteredPassword, salt);
  const hashedPasswordToCompare = `${salt}_${hash}`;

  return hashedPassword === hashedPasswordToCompare;
}
