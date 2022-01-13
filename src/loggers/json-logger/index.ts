import ExtendedLogger from "../extended-logger";
import JsonLoggerInterface from "./json-logger.interface";

class JsonLogger extends ExtendedLogger implements JsonLoggerInterface {
  error(message: string | number | boolean | object, trace?: string, context?: string): void {
    console.error(JSON.stringify({
      type: 'error',
      context: context ?? this.context,
      message,
      trace,
    }));
  }

  log(message: string | number | boolean | object, context?: string): void {
    console.log(JSON.stringify({
      type: 'log',
      context: context ?? this.context,
      message,
    }));
  }

  warn(message: string | number | boolean | object, context?: string): void {
    console.warn(JSON.stringify({
      type: 'warn',
      context: context ?? this.context,
      message,
    }));
  }

  debug(message: string | number | boolean | object, context?: string): void {
    console.debug(JSON.stringify({
      type: 'debug',
      context: context ?? this.context,
      message,
    }));
  }

  verbose(message: string | number | boolean | object, context?: string): void {
    console.log(JSON.stringify({
      type: 'verbose',
      context: context ?? this.context,
      message,
    }));
  }

  db(message: string | number | boolean | object, context?: string): void {
    console.log(JSON.stringify({
      type: 'db',
      context: context ?? this.context,
      message,
    }));
  }

  http(message: string, data?: Record<string, unknown>, context?: string): void {
    console.log(JSON.stringify({
      type: 'http',
      context: context ?? this.context,
      message,
      requestData: data,
    }))
  }
}

export default JsonLogger;
