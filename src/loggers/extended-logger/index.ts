import { Logger as NestLogger } from '@nestjs/common';
import writeHttpLog from "../../middlewares/request-logger-middleware/write-http-log";

class ExtendedLogger extends NestLogger {
  http(message, data?: { [key: string]: any }, context?: string) {
    writeHttpLog(message);
  }
}

export default ExtendedLogger;
