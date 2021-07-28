import {v4 as uuidv4} from 'uuid';
import { usersModel } from '../models/users.js';

let users = [];

class UsersController
{
  listAll(req, res) {
    res.send(users);
  }

  create(req, res) {
    users.push({ ... req.body, id: uuidv4() });
    res.send(users);
  }

  findById(req, res) {
    const { id } = req.params;
    const foundUser = users.find((user) => { 
      console.log(`Comparing user ID ${user.id} with ID received ${id} with result: ` + (user.id == id).toString());
      return user.id == id;
    });
    
    res.send(foundUser);
  }

  remove(req, res) {
    const { id } = req.params;
    users = users.filter((user) => user.id != id);
    res.send(users);
  }

  update(req, res) {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
  
    const user = users.find((user) => user.id = id);
  
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;
  
    res.send(users);
  }

  async getData(req, res){
    let messages = {};
    
    try
    {
      const result = await usersModel.getUserById(req.params.id);
      if (result ===  null) {
        messages.error = true;
        messages.messages = 'Internal Server error.';
        global.logger.error('Unable to retrieve user data using ID: ' + req.params.id);
        res.send(messages);
      }
      else{
        messages.error = false;
        messages.messages = result;
        res.send(messages);
      }
    }
    catch(error){
      global.logger.error('GetData catch error: ' + error);
    }
  }
}

export const usersController = new UsersController();