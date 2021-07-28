import { db } from '../configs/database.js';

class Common
{
  constructor() {
    this.db = db;
  }

  async getCountryById (countryId) {
		try {
      return await this.db.query(`select * from api.country where country_id = ?`, `${countryId}`);
    } 
    catch (error) {
      global.logger.exception(error);
      return null;
    }
	}
}

export const commonModel = new Common();