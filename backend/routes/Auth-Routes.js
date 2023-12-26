import express from "express";
import passport from "passport";

const authRouter = express.Router();

//@Desc Auth with google
//@rotue GET /auth/google
authRouter.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

//@desc Google auth callback
//@route GET /auth/google/callback
authRouter.get("/google/callback", passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3001/')
});

export default authRouter;