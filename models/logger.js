import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import pkg from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import config from '../configs/app/index.js';

require('winston-daily-rotate-file');

const winston = pkg;

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}][${level.toUpperCase()}] ${message}`;
});

config.file.app.loggerOptions.format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
  myFormat
);

const logger = winston.createLogger({
  level: 'info',
  transports: [
    //new winston.transports.File({ filename: "logfile.log", level: 'error' }), //save errors on file
    new winston.transports.DailyRotateFile(config.file.app.loggerOptions),
    new ElasticsearchTransport(config.elasticsearch.loggerOptions.transportApp) //everything info and above goes to elastic
  ]
});

function logException(error) {
  var caller_line = error.stack.split("\n")[1];
  var index = caller_line.indexOf("log ");
  var clean = caller_line.slice(index+4, caller_line.length);
  logger.error(`'${error.name}: ${error.message}' ${clean}`);
}

export const info = (data) => { logger.info(data) }
export const warn = (data) => { logger.warn(data) }
export const alert = (data) => { logger.alert(data) }
export const error = (data) => { logger.error(data) }
export const exception = (data)  => { logException(data) }