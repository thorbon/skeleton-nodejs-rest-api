import { db } from '../configs/database.js';

class Users
{
  constructor() {
    this.db = db;
  }

  async getUserById (id) {
		try {
      return await this.db.query(`select * from api.users where id = ?`, `${id}`);
    } 
    catch (error) {
      global.logger.exception(error);
      return null;
    }
	}
}

export const usersModel = new Users();