import express from 'express';
import { usersController } from '../controllers/users.js';

const router = express.Router();

router.get('/data/:id', usersController.getData);

router.get('/', usersController.listAll);
router.post('/', usersController.create);
router.get('/:id', usersController.findById);
router.delete('/:id', usersController.remove);
router.patch('/:id', usersController.update);

export default router;