import { Logger as NestLogger } from '@nestjs/common';
import ExtendedLoggerInterface from "./extended-logger.interface";
import { writeDbLog, writeHttpLog } from "../../utils";

class ExtendedLogger extends NestLogger implements ExtendedLoggerInterface {
  http(message: string) {
    writeHttpLog(message);
  }

  db(message: string, context?: string): void {
    writeDbLog(context || this.context, message)
  }
}

export default ExtendedLogger;
