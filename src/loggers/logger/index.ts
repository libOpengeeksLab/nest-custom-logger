import JsonLogger from "../json-logger";
import ExtendedLogger from "../extended-logger";

function Logger(isDevelopment: false): typeof JsonLogger;
function Logger(isDevelopment: true): typeof ExtendedLogger;
function Logger(isDevelopment: boolean): typeof ExtendedLogger | typeof JsonLogger;
function Logger(isDevelopment: boolean): typeof ExtendedLogger | typeof JsonLogger {
  return isDevelopment === false ? JsonLogger : ExtendedLogger;
}

export default Logger;
