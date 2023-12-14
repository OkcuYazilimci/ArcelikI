import express from 'express';
import passport from 'passport';
import { passports, success, signout} from '../controllers/Auth-Controller';
const authRouter = express.Router();


authRouter.get("/", passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get("/callback", passport.authenticate('google', { failureRedirect: '/auth/google/error' }), passports);
authRouter.get("/success", success);
authRouter.get('/error', (req, res) => res.send('Error logging in via Google..'));
authRouter.get("/signout", signout);

export default authRouter;