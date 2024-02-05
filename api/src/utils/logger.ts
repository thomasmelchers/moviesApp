import winston from 'winston'
const { printf, timestamp, prettyPrint, colorize, combine, json } =
    winston.format

const logFormat = combine(json(), timestamp(), prettyPrint())

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level: 'warn',
            filename: 'logs/warningsLogs.log',
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/errorsLogs.log',
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'logs/infoLogs.log',
        }),
    ],
})

export default logger
