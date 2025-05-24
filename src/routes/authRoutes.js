import express from 'express';
import {register,login,refreshAccessToken,logout,verifyEmail,sendFogotPasswordLink,resetPassword} from '../controllers/authController.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/refresh-token',refreshAccessToken);
router.post('/logout',logout);
router.post('/verify-email',verifyEmail);
router.get('/fogot-password',sendFogotPasswordLink);
router.post('/reset-password',resetPassword);

export default router;