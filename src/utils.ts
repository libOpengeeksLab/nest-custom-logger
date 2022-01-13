export function writeHttpLog(log: string): void {
  const timeStamp = new Date().toISOString();
  const level = 'http';

  const message = `[${timeStamp}] [\x1b[33m${level}\x1b[0m]\x1b[33m - ${log}\x1b[0m`;

  console.log(message);
}

export function writeDbLog(context: string, ...logs: unknown[]) {
  const timeStamp = new Date().toISOString();

  console.log(`[${timeStamp}] \x1b[33m[${context}]\x1b[0m `, '\x1b[34m', ...logs, '\x1b[0m');
}
