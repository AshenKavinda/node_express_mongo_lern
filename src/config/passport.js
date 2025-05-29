import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/google/callback',
        scope: ['profile','email']
    },
    async(accessToken,refreshToken,profile,done) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (!user) {
                user = new User({
                userId: uuidv4(),
                name: profile.displayName,
                email: profile.emails[0].value,
                isVerified: true,
                provider: 'google',
                role: 'user'
                });
                await user.save();
            }

            return done(null, user);
        } catch (error) {
            return done(error,null);
        }
    }
));

// Serialize/Deserialize User
passport.serializeUser((user, done) => done(null, user.userId));
passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({ userId });
  done(null, user);
});