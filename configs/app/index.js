var env = process.env.NODE_ENV || 'development';
import configProd from './config.production.js';
import configDev from './config.development.js';

switch(env)
{
  case 'production':
    var config = configProd;
    break;
  
  default:
    var config = configDev;
}

export default config;