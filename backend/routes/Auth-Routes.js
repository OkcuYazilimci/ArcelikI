import express from "express";
import passport from "passport";

const authRouter = express.Router();

//@Desc Auth with google
//@rotue GET /auth/google
authRouter.get("/google", passport.authenticate("google", { scope: ['profile'] }));

//@desc Google auth callback
//@route GET /auth/google/callback
authRouter.get("/goole/callback", passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/api-blog/getAll')
});

export default authRouter;