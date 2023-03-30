import winston from 'winston';

const WinstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf((info) => `${info.timestamp} ${info.message}`),
      ),
      handleExceptions: true,
    }),
  ],
});

const TEST_SEPARATOR = '-'.repeat(120);

export default class Logger {
  public static testBegin(scenario: string): void {
    this.printLogs(`Scenario: ${scenario} - Started`, TEST_SEPARATOR);
  }

  public static testEnd(scenario: string, status: string): void {
      this.printLogs(`Scenario: ${scenario} - ${status}`, TEST_SEPARATOR);
  }

  private static printLogs(msg: string, separator: string): void {
    WinstonLogger.info(separator);
    Logger.info(`${msg.toUpperCase()}`);
    Logger.info(separator);
  }

  public static info(message: string): void {
    WinstonLogger.info(message);
  }

  public static error(error: string): void {
    WinstonLogger.error(error);
  }
}