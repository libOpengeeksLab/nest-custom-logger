import { WriteLogDataType } from "./write-log-data.type";

export type WriteLogType = (logMessage: string, data: WriteLogDataType) => void;
