import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(
    @Inject('LoggerService')
    private readonly logger: LoggerService,
  ) {}

  public async use(request: Request, response: Response, next: NextFunction) {
    const { method, path, body, query } = request;
    const { statusCode, statusMessage } = response;

    const strQuery = `query: ${JSON.stringify(query)}`;
    const strBody = `body: ${JSON.stringify(body)}`;

    response.on('finish', async () => {
      const message = `${method} ${path} ${strBody} ${strQuery} -> ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return await this.logger.error(message);
      }

      if (statusCode >= 400) {
        return await this.logger.warn(message);
      }

      return await this.logger.log(message);
    });

    next();
  }
}
