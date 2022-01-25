import requestLoggerMiddleware from "./middlewares/request-logger-middleware";
import Logger from "./loggers/logger";
import CustomLogger, { requestLogger } from "./predefined";

export default Logger;
export {
  CustomLogger,
  requestLoggerMiddleware,
  requestLogger,
}
