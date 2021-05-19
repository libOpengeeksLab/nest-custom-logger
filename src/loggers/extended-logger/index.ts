import { Logger as NestLogger } from '@nestjs/common';
import writeHttpLog from "../../middlewares/request-logger-middleware/write-http-log";
import ExtendedLoggerInterface from "./extended-logger.interface";

class ExtendedLogger extends NestLogger implements ExtendedLoggerInterface {
  http(message: string) {
    writeHttpLog(message);
  }
}

export default ExtendedLogger;
