import { format, createLogger, transports } from "winston"

export const logger = createLogger({
    format: format.simple(),
    transports: [
      new transports.Console(),
      new transports.File({ filename: './app-log'})
    ]
});