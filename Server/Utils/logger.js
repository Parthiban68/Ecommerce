const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    transports:[
        new transports.File({
            filename: "logs/info.log",
            level: 'info',
            format:format.combine(
                format((info) => (info.level === 'info' ? info : false))(),
                format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'logs/error.log', 
            level: 'error',
            format: format.combine(
                format((info) => (info.level === 'error' ? info : false))(),
                format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'logs/warn.log',
            level: 'warn',
            format: format.combine(
                format((info) => (info.level === 'warn' ? info : false))(),
                format.timestamp(),format.json())
        }),
    ],
});

module.exports = logger;