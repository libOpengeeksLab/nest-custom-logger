import * as  _ from 'lodash';
import writeHttpLog from './write-http-log';
import { RequestLoggerConfigType } from "./types/request-logger-config.type";
import { WriteLogDataType } from "./types/write-log-data.type";

function requestLoggerMiddleware(config: RequestLoggerConfigType): (req, res, next) => void {
  const {
    regexs,
    urlsWithDisabledLogs,
    urlsThatIsShowedOnStart,
    dataToPickFromRequest,
    dataToPickFromResponse,
    writeLog = writeHttpLog,
  } = config;

  /**
   * Middleware displays formatted request logs in console
   *
   * @param req
   * @param res
   * @param next
   */
  const requestLogger = (req, res, next) => {
    const { method, originalUrl } = req;
    const start = Date.now();
    const clientIp = _.get(req, 'headers.x-real-ip') || _.get(req, 'headers.x-forwarded-for') || _.get(req, 'connection.remoteAddress');

    if (_.some(regexs, (x) => originalUrl.match(x))) {
      return next();
    }

    if (urlsWithDisabledLogs === true || _.some(urlsWithDisabledLogs, (x) => originalUrl === x)) {
      return next();
    }

    const data: WriteLogDataType = {
      clientIp,
      method,
      originalUrl,
      ..._.pick(req, dataToPickFromRequest),
    };

    if (
      urlsThatIsShowedOnStart === true ||
      _.some(urlsThatIsShowedOnStart, (x) => _.includes(originalUrl, x))
    ) {
      const log = `${clientIp} - ${method} ${originalUrl} - Request started.`;
      writeLog(log, data);
    }

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const contentSize = _.get(res, 'Content-Length', 0);
      const responseTime = Date.now() - start;

      const log = `${clientIp} - ${method} ${originalUrl} - ${statusCode} [${statusMessage}] (${contentSize}b sent in ${responseTime} ms)`;
      writeLog(
        log,
        {
          ...data,
          ..._.pick(res, dataToPickFromResponse),
          statusCode,
          statusMessage,
          contentSize,
          responseTime,
        }
      );
    });

    return next();
  };

  return requestLogger;
}

export default requestLoggerMiddleware;
