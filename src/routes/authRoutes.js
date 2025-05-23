import express from 'express';
import {register,login,refreshAccessToken,logout,verifyEmail} from '../controllers/authController.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/refresh-token',refreshAccessToken);
router.post('/logout',logout);
router.post('/verify-email',verifyEmail);

export default router;