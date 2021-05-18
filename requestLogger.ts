/* eslint-disable */
/* tslint-disable */
import * as  _ from 'lodash';

const writeHttpLog = (log) => {
  const timeStamp = new Date().toISOString();
  const level = 'http';

  const message = `[${timeStamp}] [\x1b[33m${level}\x1b[0m]\x1b[33m - ${log}\x1b[0m`;

  console.log(message);
};

interface WriteLogData {
  clientIp?: string;
  method?: string;
  originalUrl?: string;
  statusCode?: number;
  statusMessage?: string;
  contentSize?: number;
  responseTime?: number;

  [key: string]: unknown;
}

interface RequestLoggerConfig {
  /**
   * Provide an ability to exclude logs
   *
   * @type {RegExp[]}
   */
  regexs?: RegExp[]

  /**
   * Provide an ability to exclude logs by urls
   *
   * @type {String[]}
   *
   * if true will apply for all logs
   */
  urlsWithDisabledLogs?: string[] | true

  /**
   * Provide an ability to show logs on start of request
   *
   * @type {String[]}
   *
   * if true will apply for all logs
   */
  urlsThatIsShowedOnStart?: string[] | true

  /**
   * Provide an ability to pick additional data from request
   *
   * @type {String[]}
   *
   * lodash method is using
   */
  dataToPickFromRequest?: string[],

  /**
   * Provide an ability to pick additional data from response
   *
   * @type {String[]}
   *
   * lodash method is using
   */
  dataToPickFromResponse?: string[],

  /**
   * Function to create custom log output
   *
   * @param logMessage: formatted log
   * @param {WriteLogData} data: values for logging
   */
  writeLog?: (logMessage: string, data: WriteLogData) => void
}

function RequestLogger(config: RequestLoggerConfig): (req, res, next) => void {

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

    const data: WriteLogData = {
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

export default RequestLogger;
export { writeHttpLog }
