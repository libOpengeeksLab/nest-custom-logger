import ExtendedLogger from "../extended-logger";

class JsonLogger extends ExtendedLogger {
  error(message: any, trace?: string, context?: string): void {
    console.error(JSON.stringify({
      type: 'error',
      context: this.context,
      message,
      trace,
    }));
  }

  log(message: any, context?: string): void {
    console.log(JSON.stringify({
      type: 'log',
      context: this.context,
      message,
    }));
  }

  warn(message: any, context?: string): void {
    console.warn(JSON.stringify({
      type: 'warn',
      context: this.context,
      message,
    }));
  }

  debug(message: any, context?: string): void {
    console.debug(JSON.stringify({
      type: 'debug',
      context: this.context,
      message,
    }));
  }

  verbose(message: any, context?: string): void {
    console.log(JSON.stringify({
      type: 'verbose',
      context: this.context,
      message,
    }));
  }

  http(message, data?, context?: string) {
    console.log(JSON.stringify({
      type: 'http',
      context: this.context,
      message,
      requestData: data,
    }))
  }
}

export default JsonLogger;
