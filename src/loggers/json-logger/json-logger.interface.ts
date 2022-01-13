import ExtendedLoggerInterface from "../extended-logger/extended-logger.interface";

export default interface JsonLoggerInterface extends ExtendedLoggerInterface {
  error(message: string | number | boolean | object, trace?: string, context?: string): void;

  log(message: string | number | boolean | object, context?: string): void;

  warn(message: string | number | boolean | object, context?: string): void;

  debug(message: string | number | boolean | object, context?: string): void;

  verbose(message: string | number | boolean | object, context?: string): void;

  db(message: string | number | boolean | object, context?: string): void;

  http(message: string, data?: Record<string, unknown>, context?: string): void;
}
