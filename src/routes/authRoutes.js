import express from 'express';
import passport from 'passport';
import {register,login,refreshAccessToken,logout,verifyEmail,sendFogotPasswordLink,resetPassword,loginWithgoogle} from '../controllers/authController.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/refresh-token',refreshAccessToken);
router.post('/logout',logout);
router.post('/verify-email',verifyEmail);
router.get('/fogot-password',sendFogotPasswordLink);
router.post('/reset-password',resetPassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login', 
    session: false 
  }),loginWithgoogle
);

export default router;