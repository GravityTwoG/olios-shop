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

import {
  DomainException,
  DomainExceptionCodes,
} from './lib/domain/domain.exception';

type HttpExceptionData = {
  message: string;
  status: number;
};

const domainExceptionsMap = {
  [DomainExceptionCodes.ALREADY_USED]: 400,
  [DomainExceptionCodes.INVALID_PAYLOAD]: 400,
  [DomainExceptionCodes.OUT_OF_DATE]: 400,
  [DomainExceptionCodes.NOT_FOUND]: 404,
  [DomainExceptionCodes.NO_PERMISSION]: 403,
  [DomainExceptionCodes.UNKNOWN]: 500,
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  logger = new Logger(GlobalExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    let httpException = {
      message: exception.message,
      status:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      if (exception.getStatus() >= 500) {
        this.logger.error(exception.message);
      }

      const httpExceptionData =
        exception.getResponse() as HttpExceptionData | null;
      if (httpExceptionData?.message) {
        httpException.message = httpExceptionData.message;
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      httpException = this.handlePrismaException(exception);
    } else if (exception instanceof DomainException) {
      httpException = this.handleDomainException(exception);
    } else {
      if (exception.response?.message) {
        httpException.message = exception.response.message;
      }

      this.logger.error(exception);
    }

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const responseBody = {
      statusCode: httpException.status,
      message: httpException.message,

      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpException.status);
  }

  private handleDomainException(exception: DomainException): HttpExceptionData {
    const httpException = {
      message: exception.message,
      status: domainExceptionsMap[exception.code],
    };

    if (exception.code === DomainExceptionCodes.UNKNOWN) {
      httpException.message = 'Internal error.';
      this.logger.error(exception.message);
    }

    return httpException;
  }

  // https://www.prisma.io/docs/reference/api-reference/error-reference
  private handlePrismaException(
    exception: PrismaClientKnownRequestError,
  ): HttpExceptionData {
    const httpException = {
      message: 'Internal error',
      status: 500,
    };

    if (
      exception.code === 'P2007' ||
      exception.code === 'P2011' ||
      exception.code === 'P2012' ||
      exception.code === 'P2013' ||
      exception.code === 'P2019' ||
      exception.code === 'P2020'
    ) {
      httpException.message = 'Invalid data';
      httpException.status = 400;
    } else if (
      exception.code === 'P2015' ||
      exception.code === 'P2018' ||
      exception.code === 'P2025'
    ) {
      httpException.message = 'A related record could not be found.';
      httpException.status = 404;
    } else if (exception.code === 'P2028' || exception.code === 'P2034') {
      httpException.message = 'Transaction failed.';
    }

    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      httpException.message = `code: ${exception.code}, meta: ${JSON.stringify(
        exception.meta,
      )}, message: ${exception.message}`;
    }

    this.logger.error(
      `code: ${exception.code}, meta: ${JSON.stringify(
        exception.meta,
      )}, message: ${exception.message}`,
    );

    return httpException;
  }
}
