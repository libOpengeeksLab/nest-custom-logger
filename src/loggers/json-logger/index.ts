import ExtendedLogger from "../extended-logger";
import JsonLoggerInterface from "./json-logger.interface";

class JsonLogger extends ExtendedLogger implements JsonLoggerInterface {
  error(message: string | number | boolean | object, trace?: string) {
    console.error(JSON.stringify({
      type: 'error',
      context: this.context,
      message,
      trace,
    }));
  }

  log(message: string | number | boolean | object): void {
    console.log(JSON.stringify({
      type: 'log',
      context: this.context,
      message,
    }));
  }

  warn(message: string | number | boolean | object): void {
    console.warn(JSON.stringify({
      type: 'warn',
      context: this.context,
      message,
    }));
  }

  debug(message: string | number | boolean | object): void {
    console.debug(JSON.stringify({
      type: 'debug',
      context: this.context,
      message,
    }));
  }

  verbose(message: string | number | boolean | object): void {
    console.log(JSON.stringify({
      type: 'verbose',
      context: this.context,
      message,
    }));
  }

  http(message: string, data?: Record<string, unknown>) {
    console.log(JSON.stringify({
      type: 'http',
      context: this.context,
      message,
      requestData: data,
    }))
  }
}

export default JsonLogger;
