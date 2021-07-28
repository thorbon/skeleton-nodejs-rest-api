//var config = module.exports = {};

var config = [];
config.env = 'development';
config.hostname = 'dev.example.com';

config.logger = {};
config.logger.elasticsearch = {
  server: { enabled: true },
  app: { enabled: true }
};

// file logger config
config.file = {
  server: {},
  app: {}
};

config.file.server.loggerOptions = {
  filename: 'server-%DATE%.log',
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  //maxSize: '20m',
  maxFiles: '30d',
  level: 'info',
  dirname: './logs'
}

config.file.app.loggerOptions = {
  filename: 'application-%DATE%.log',
  datePattern: 'YYYYMMDD',
  zippedArchive: true,
  //maxSize: '20m',
  maxFiles: '30d',
  level: 'info',
  dirname: './logs'
}
// file logger config end

// elasticsearch config
config.elasticsearch = {};
config.elasticsearch.host = process.env.ELASTICSEARCH_HOST || 'localhost';
config.elasticsearch.port = 9200;

config.elasticsearch.loggerOptions = {};
config.elasticsearch.loggerOptions.transportServer = {
    level: 'info',
    indexPrefix: 'server-logs',
    clientOpts: {
        node: `http://${config.elasticsearch.host}:${config.elasticsearch.port}`,
        log:"info"
    }
  };

config.elasticsearch.loggerOptions.transportApp = {
  level: 'info',
  indexPrefix: 'app-logs',
  clientOpts: {
      node: `http://${config.elasticsearch.host}:${config.elasticsearch.port}`,
      log:"info"
  }
};
// elasticsearch config end

// MYSQL configuration
config.mysql = {}

// Default Database
config.mysql.default = {};
config.mysql.default = {
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: ''
}

// API Database
config.mysql.ncapi = {};
config.mysql.ncapi = {
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: ''
}

console.log('Hostname in global: ' + config.hostname);

export default config;