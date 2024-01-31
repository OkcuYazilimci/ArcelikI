import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../model/User';
import { connectToDB } from '../../../../utils/database';
import { createToken } from '../../../../utils/authToken';
import { serialize } from 'cookie';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ account, profile, user, credentials, context }) {
      try {
        await connectToDB();

        console.log('Checking if user exists for profile:', profile);

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        console.log('User exists:', userExists);

        // If not, create a new document and save the user in MongoDB
        let userId;
        if (!userExists) {
            const {
                googleId,
                displayName,
                firstName,
                lastName,
                email,
                imageurl,
                blogs,
            } = profile;

            console.log('Creating user:', profile);

            const newUser = await User.create({
                googleId,
                displayName: profile.name,
                firstName: profile.given_name,
                lastName: profile.family_name,
                email,
                password: null,
                imageurl: profile.picture,
                blogs: blogs || [],
                createdAt: new Date(),
            });

            // Use the newly created user's _id
            userId = newUser._id.toString();
        } else {
            // Use the existing user's _id
            userId = userExists._id.toString();
        }

        // Create a token using the correct user id
        const token = await createToken(userId);

        // Set the token in a cookie
        const cookieName = 'user-info-jwt';
        const cookieOptions = {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day in seconds
            path: '/', // the cookie is available for all routes
        };

        const serializedToken = serialize(cookieName, token, cookieOptions);

        // Set the cookie in the response headers
        // (Make sure to use the appropriate method based on your framework)
        context.res.setHeader('Set-Cookie', serializedToken);

        // Add the MongoDB user id and the token to the session
        user.id = userId;
        user.token = token;

        return true;
    } catch (error) {
        console.error("Error checking if user exists:", error);
        return {
            error: "Error checking if user exists",
            message: error.message,
        };
    }
},
  },
});

export { handler as GET, handler as POST };
