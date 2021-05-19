import { WriteLogType } from "./write-log.type";

export type RequestLoggerConfigType = {
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
   * @param {WriteLogDataType} data: values for logging
   */
  writeLog?: WriteLogType,
}
