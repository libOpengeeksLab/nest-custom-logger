import * as Loggers from './logger';

function Logger(isDevelopment: false): typeof Loggers.CustomLogger;
function Logger(isDevelopment: true): typeof Loggers.Logger;
function Logger(
  isDevelopment: boolean,
): typeof Loggers.Logger | typeof Loggers.CustomLogger;
function Logger(
  isDevelopment: boolean,
): typeof Loggers.Logger | typeof Loggers.CustomLogger {
  return isDevelopment === false ? Loggers.CustomLogger : Loggers.Logger;
}

export default Logger;
