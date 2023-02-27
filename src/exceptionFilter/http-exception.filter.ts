import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpAdapterHost,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;
    const { name, message } = exception;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      error: name,
      message: message,
    };

    this.logger.writeResponse(httpStatus, JSON.stringify(responseBody));

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
