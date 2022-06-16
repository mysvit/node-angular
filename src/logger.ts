import * as winston from 'winston'

const level = process.env.LOG_LEVEL || 'debug';
const silent = process.env.NODE_ENV === 'test';

const loggerFormat = winston.format.printf(({level, message, timestamp}) => {
    return `{"timestamp": "${timestamp}", "level": "${level}", "message": "${message}"}`
});

export const logger = winston.createLogger({
    level,
    format: winston.format.combine(
        winston.format.timestamp(),
        loggerFormat
    ),
    transports: [
        new winston.transports.Console()
    ],
    exitOnError: false,
    silent
});

// Allow morgan middleware to write to winston
export const stream = {
    write: (message: string) => {
        logger.info(message.trim())
    }
}
