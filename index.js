import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from 'express';
const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');
const expressWinston = require('express-winston');
import config from './configs/app/index.js';
import * as logger from './models/logger.js';

require('winston-daily-rotate-file');

import routesUsers from './routes/users.js';

// Define global variables
global.logger = logger;

const app = express();
const PORT = 8001;

const myFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `[${timestamp}] `;

  if(metadata) {
    msg += JSON.stringify(metadata)
  }

  return msg;
});

config.file.server.loggerOptions.format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  myFormat
);

const transportsList = [];
//transportsList.push(new winston.transports.File({ filename: "logfile.log", level: 'error' })); //save errors on file
transportsList.push(new winston.transports.DailyRotateFile(config.file.server.loggerOptions)); //save errors on file
if(config.logger.elasticsearch.server.enabled)
  transportsList.push(new ElasticsearchTransport(config.elasticsearch.loggerOptions.transportServer)); //everything info and above goes to elastic

//console.log(config.logger.elasticsearch);
app.use(expressWinston.logger({
  transports: transportsList,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "{{req.protocol}} {{req.method}} {{res.statusCode}} {{req.hostname}} {{req.ip}} {{req.url}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use(express.json());
app.use('/users', routesUsers);

app.get('/', (req, res) => {
  console.log('TEST');
  res.send('Hello from home');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}.`); 
});