import { ConsoleLogger } from '@nestjs/common';
import { writeDbLog, writeHttpLog } from "../../utils";
import LoggerInterface from "../logger/logger.interface";

class ExtendedLogger extends ConsoleLogger implements LoggerInterface {
  http(message: string) {
    writeHttpLog(message);
  }

  db(message: string, context?: string): void {
    writeDbLog(context || this.context, message)
  }
}

export default ExtendedLogger;
