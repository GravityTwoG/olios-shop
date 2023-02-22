export enum DomainExceptionCodes {
  'NOT_FOUND' = 'NOT_FOUND',
  'ALREADY_USED' = 'ALREADY_USED',
  'OUT_OF_DATE' = 'OUT_OF_DATE',
  'INVALID_PAYLOAD' = 'INVALID_PAYLOAD',
  'NO_PERMISSION' = 'NO_PERMISSION',
  'UNKNOWN' = 'UNKNOWN',
}

export class DomainException extends Error {
  code: DomainExceptionCodes;

  constructor(code: DomainExceptionCodes, message: string) {
    super(message);
    this.code = code;
  }
}
