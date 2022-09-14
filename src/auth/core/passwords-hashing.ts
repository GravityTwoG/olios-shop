import * as crypto from 'crypto';

const SALT_LENGTH = 10;
const ITERATIONS = 10;
const HASH_LEN = 10;

function hashString(str: string, salt: string): string {
  return crypto
    .pbkdf2Sync(str, salt, ITERATIONS, HASH_LEN, 'sha512')
    .toString('hex');
}

export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = hashString(password, salt);

  return { salt, hash };
}

export function comparePasswords(args: {
  hashedPassword: string;
  passwordSalt: string;
  enteredPassword: string;
}): boolean {
  const { hashedPassword, passwordSalt, enteredPassword } = args;
  const hash = hashString(enteredPassword, passwordSalt);

  return hashedPassword === hash;
}
