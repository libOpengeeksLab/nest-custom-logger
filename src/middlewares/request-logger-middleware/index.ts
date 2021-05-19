import * as  _ from 'lodash';
import writeHttpLog from './write-http-log';
import { RequestLoggerConfigType } from "./types/request-logger-config.type";
import { WriteLogDataType } from "./types/write-log-data.type";
import { RequestHandler } from "@nestjs/common/interfaces";

function requestLoggerMiddleware(config: RequestLoggerConfigType): RequestHandler {
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
  const requestLogger: RequestHandler = (req, res, next) => {
    const { method, originalUrl } = req;
    const start = Date.now();
    const clientIp = _.get(req, 'headers.x-real-ip') || _.get(req, 'headers.x-forwarded-for') || _.get(req, 'connection.remoteAddress');

    if (_.some(regexs, (x) => originalUrl.match(x))) {
      return _.isFunction(next) ? next() : next;
    }

    if (urlsWithDisabledLogs === true || _.some(urlsWithDisabledLogs, (x) => originalUrl === x)) {
      return _.isFunction(next) ? next() : next;
    }

    const requestData = _.isNil(dataToPickFromRequest) ? { } : _.pick(res, dataToPickFromRequest)

    const data: WriteLogDataType = {
      clientIp,
      method,
      originalUrl,
      ...requestData,
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

      const responseData = _.isNil(dataToPickFromResponse) ? { } : _.pick(res, dataToPickFromResponse)

      writeLog(
        log,
        {
          ...data,
          ...responseData,
          statusCode,
          statusMessage,
          contentSize,
          responseTime,
        }
      );
    });

    return _.isFunction(next) ? next() : next;
  };

  return requestLogger;
}

export default requestLoggerMiddleware;
