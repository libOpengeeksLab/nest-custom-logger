import { Logger as NestLogger } from "@nestjs/common/services/logger.service";

export default interface ExtendedLoggerInterface extends NestLogger {
  http(message: string, data?: Record<string, unknown>, context?: string): void
  db(message: string, context?: string): void
}
