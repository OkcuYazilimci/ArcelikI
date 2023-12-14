import { Strategy as GoogleStrategy} from "passport-google-oauth20";
//import mongoose from "mongoose";
//import GoogleUser from "../model/GoogleUser";

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    }))
}
