import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import passport from "passport";
import User from "../model/User.js";
import mongoose from "mongoose";

export const module = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            imageurl: profile.photos[0].value,
        }
            try {
                let user = await User.findOne({ googleId: profile.id})

                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch(err) {
                console.error(err)
            }
            }
        )
    )

        passport.serializeUser((user, done) => {
        done(null, user.id)
        }) 
        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => done(err, user))
        })
}
export default passport;
