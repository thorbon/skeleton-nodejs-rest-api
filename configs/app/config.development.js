import config from './config.global.js';

config.env = 'development';
config.hostname = 'test.example';

//elasticsearch config
config.elasticsearch = {};
config.elasticsearch.host = 'localhost';
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

// API Database
config.mysql.ncapi = {
  host: 'localhost',
  port: 3306,
  username: 'nodejs',
  password: 'titExaHu',
  database: 'api'
}

console.log('Hostname in dev: ' + config.hostname);

export default config;