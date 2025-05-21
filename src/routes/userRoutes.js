import express from 'express';
import { authenticate,authorize } from '../middlewares/authMiddleware.js';
import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/',authenticate,authorize(['admin']),createUser);
router.get('/',authenticate,authorize(['admin']),getUsers);
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.delete('/:id',authenticate,authorize(['admin']),deleteUser);

export default router;