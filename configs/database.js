import mysql from 'mysql';
import * as logger from '../models/logger.js';
import config from './app/index.js';

console.log(config.mysql['ncapi'] != undefined);


let setConnection = (connectionName) => {
  
  let dbConfig = {};
  if(config.mysql[connectionName] != undefined){
    dbConfig = {
      connectionLimit: 5000,
      connectTimeout  : 60 * 60 * 1000,
      acquireTimeout  : 60 * 60 * 1000,
      timeout         : 60 * 60 * 1000,
      host: config.mysql[connectionName].host,
      user: config.mysql[connectionName].username,
      password: config.mysql[connectionName].password,
      database: config.mysql[connectionName].database,
      insecureAuth : true
    };
  }
  else {
    global.logger.error(`Database connection name '${connectionName}' is not configured. Please check config file.`);
  }
  
  return mysql.createPool(dbConfig);
}

class Db {

	constructor() {
		this.connection = mysql.createPool({
			connectionLimit: 5000,
      connectTimeout  : 60 * 60 * 1000,
      acquireTimeout  : 60 * 60 * 1000,
      timeout         : 60 * 60 * 1000,
      host: config.mysql.ncapi.host,
      user: config.mysql.ncapi.username,
      password: config.mysql.ncapi.password,
      database: config.mysql.ncapi.database,
			debug: false
		});
	}

	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err)
					return reject(err);
				resolve(rows);
			});
		});
	}

	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err)
					return reject(err);
				resolve();
			});
		});
	}

}

export const db = new Db();