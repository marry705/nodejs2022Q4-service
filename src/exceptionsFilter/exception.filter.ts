import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()['message'] ?? exception.getResponse()
        : 'UNKNOWN_EXCEPTION_MESSAGE';

    this.logger.writeResponse(httpStatus, message);

    ctx.getResponse().status(httpStatus).json({
      httpStatus,
      message,
    });
  }
}
