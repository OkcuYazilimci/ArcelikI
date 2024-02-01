import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../model/User';
import { connectToDB } from '../../../../utils/database';

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // This is called whenever a JWT is created. If the user is defined, attach the user's token to the JWT token.
            if (user) {
                token.accessToken = user.token; // Assuming you're attaching the token here
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken;
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
            }
            return session;
        },
        async signIn({ account, profile, context }) {
            try {
                await connectToDB();

                // Check if the user exists in the database
                let userRecord = await User.findOne({ email: profile.email });

                // If user does not exist, create a new user record
                if (!userRecord) {
                    userRecord = await User.create({
                        googleId: profile.id,
                        displayName: profile.name,
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                        email: profile.email,
                        imageurl: profile.picture,
                        blogs: [],
                        createdAt: new Date(),
                    });
                }
                return true;
            } catch (error) {
                console.error("signIn error:", error);
                return false; // Indicate unsuccessful sign in
            }
        },
    },
};

const handler = (req, res) => NextAuth(req, res, options);

export { handler as GET, handler as POST };