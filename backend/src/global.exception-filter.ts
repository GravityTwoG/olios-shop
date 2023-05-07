import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DomainException, DomainExceptionCodes } from './domain.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  logger = new Logger(GlobalExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message;

    if (exception instanceof HttpException) {
      if (exception.getStatus() >= 500) {
        this.logger.error(exception.message);
      }
      if ((exception as any).response?.message) {
        message = (exception as any).response?.message;
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      const isProduction = process.env.NODE_ENV === 'production';

      // handle prisma errors
      if (!isProduction) {
        message = `code: ${exception.code},${JSON.stringify(exception.meta)}`;
      }
      this.logger.error(exception.meta);
    } else if (exception instanceof DomainException) {
      message = exception.message;
      if (exception.code === DomainExceptionCodes.ALREADY_USED) {
        status = 400;
      }
      if (exception.code === DomainExceptionCodes.INVALID_PAYLOAD) {
        status = 400;
      }
      if (exception.code === DomainExceptionCodes.NOT_FOUND) {
        status = 404;
      }
      if (exception.code === DomainExceptionCodes.NO_PERMISSION) {
        status = 403;
      }
      if (exception.code === DomainExceptionCodes.OUT_OF_DATE) {
        status = 400;
      }
      if (exception.code === DomainExceptionCodes.UNKNOWN) {
        status = 500;
        message = 'Internal error.';
        this.logger.error(exception.message);
      }
    } else {
      if (exception.response?.message) {
        message = exception.response.message;
        this.logger.error(message);
      } else {
        this.logger.error(exception);
      }
    }

    const responseBody = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
