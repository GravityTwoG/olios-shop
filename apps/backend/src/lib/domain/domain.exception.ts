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

export class EntityNotFoundException extends DomainException {
  code = DomainExceptionCodes.NOT_FOUND;

  constructor(entityName: string) {
    super(DomainExceptionCodes.NOT_FOUND, `${entityName} not found.`);
  }
}

export class EntityAlreadyUsedException extends DomainException {
  code = DomainExceptionCodes.ALREADY_USED;

  constructor(entityName: string) {
    super(DomainExceptionCodes.ALREADY_USED, `${entityName} already used.`);
  }
}

export class InvalidPayloadException extends DomainException {
  code = DomainExceptionCodes.INVALID_PAYLOAD;

  constructor(message: string) {
    super(DomainExceptionCodes.INVALID_PAYLOAD, message);
  }
}

export class UnknownException extends DomainException {
  code = DomainExceptionCodes.UNKNOWN;

  constructor(message: string) {
    super(DomainExceptionCodes.UNKNOWN, message);
  }
}

export class NoPermissionException extends DomainException {
  code = DomainExceptionCodes.NO_PERMISSION;

  constructor(message: string) {
    super(DomainExceptionCodes.NO_PERMISSION, message);
  }
}
