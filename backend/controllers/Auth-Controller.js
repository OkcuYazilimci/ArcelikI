import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as googleAuth from '../dal/google-auth.dal';

let userProfile;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

export const passports = 
(req, res) => {
    res.redirect('/auth/google/success'); // Successful authentication, redirect success.
}; 

export const success = async (req, res) => {
    const { failure, success } = await googleAuth.registerWithGoogle(userProfile);
    if (failure) console.log('Google user already exist in DB..');
    else console.log('Registering new Google user..');
    res.render('success', { user: userProfile });
  };

export const signout = (req, res) => {
    try {
      req.session.destroy(function (err) {
        console.log('session destroyed.');
      });
      res.render('auth');
    } catch (err) {
      res.status(400).send({ message: 'Failed to sign out user' });
    }
  };