export enum ConsoleLogLevel {
  Info = "info",
  Log = "log",
  Warning = "warn",
  Error = "error",
  Debug = "debug",
}

export const ConsoleLogLevels: ConsoleLogLevel[] = [
  ConsoleLogLevel.Info,
  ConsoleLogLevel.Log,
  ConsoleLogLevel.Warning,
  ConsoleLogLevel.Error,
  ConsoleLogLevel.Debug,
];

export interface ConsoleLog {
  level: ConsoleLogLevel;
  message: string;
}
