import { Logger } from "../loggers/logger";
import { RequestHandler } from "@nestjs/common/interfaces";
import LoggerInterface from "../loggers/logger/logger.interface";
import { requestLoggerMiddleware } from "../middlewares/request-logger-middleware";

/**
 * @param {string} context - context of Logger
 *
 * @return {Logger} class instance of Logger using process.env.NODE_ENV if process.env.NODE_ENV is undefined uses colored logger else json logger
 */
const CustomLogger = (context: string): LoggerInterface => {
  return new (Logger(!process.env.NODE_ENV))(context);
};

const requestWriteLogs = CustomLogger('Request');

/**
 * @return {requestLoggerMiddleware} instance with predefined config
 */
const requestLogger = <RequestHandler>requestLoggerMiddleware({
  regexs: [/\/api*/g, /\/socket.io/g],
  urlsWithDisabledLogs: ['/', '/health'],
  dataToPickFromRequest: ['headers.user-agent'],
  writeLog: (...params) => requestWriteLogs.http(...params),
});

export { requestLogger, CustomLogger };
