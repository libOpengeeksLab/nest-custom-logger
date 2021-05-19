export type WriteLogDataType = {
  clientIp?: string;
  method?: string;
  originalUrl?: string;
  statusCode?: number;
  statusMessage?: string;
  contentSize?: number;
  responseTime?: number;

  [key: string]: unknown;
}
