import { LoggerService as LoggerInterface, LogLevel } from '@nestjs/common';
import { appendFileSync, mkdirSync, statSync, renameSync } from 'fs';
import { dirname, join } from 'path';
import { env } from 'process';

const DEFAULT_LOGGER_FILE_SIZE = 10;
const LOG_LEVELS: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

const FILE_MAX_SIZE =
  parseInt(env.LOGGER_FILE_SIZE, 10) || DEFAULT_LOGGER_FILE_SIZE;

export class LoggerService implements LoggerInterface {
  private loggerLevel: LogLevel;

  constructor() {
    this.loggerLevel = this.getLogLevel();

    process.on('uncaughtException', async ({ message, stack }) => {
      await this.error(`Uncaught Exception: ${message}`, stack);
    });

    process.on('unhandledRejection', async (reason, promise) => {
      await this.error(`Unhandled Rejection: ${reason}`, promise);
    });
  }

  error(message: any, ...optionalParams: any[]): any {
    this.writeLog('error', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.writeLog('warn', message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.writeLog('log', message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.writeLog('verbose', message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): any {
    this.writeLog('debug', message, optionalParams);
  }

  private getLogLevel(): LogLevel {
    const logLevel = (env.LOGGER_LEVEL ?? 'debug') as LogLevel;

    if (!LOG_LEVELS.includes(logLevel as LogLevel)) {
      return 'debug';
    }

    return logLevel;
  }

  private writeLog(level: LogLevel, message: any, optionalParams: any[]): void {
    if (level.toUpperCase() !== this.loggerLevel.toUpperCase()) {
      return;
    }

    const logger =
      `${level}: ${new Date().toISOString()} ${message} ${optionalParams.join(
        ' ',
      )}` + '\n';

    process.stdout.write(logger);
    this.writeToFile(level, logger);
  }

  private async writeToFile(level: LogLevel, logger: string) {
    const fileName = level === 'error' ? 'error_file.log' : 'log_file.log';
    const filePath = join('.', 'logs', fileName);
    const pathDist = dirname(filePath);

    try {
      const { size } = statSync(filePath);

      if (size / 1024 >= FILE_MAX_SIZE) {
        const oldFilePath = join(
          pathDist,
          `${new Date().toISOString()}_${fileName}`,
        );
        renameSync(filePath, oldFilePath);
      }
    } catch (error) {
      console.error(error.message);
    }

    mkdirSync(pathDist, { recursive: true });
    appendFileSync(filePath, logger);
  }
}
