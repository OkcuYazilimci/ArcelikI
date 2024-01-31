import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../model/User';
import { connectToDB } from '../../../../utils/database';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

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

    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
  
        console.log('Checking if user exists for profile:', profile);
  
        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });
  
        console.log('User exists:', userExists);
  
        // If not, create a new document and save the user in MongoDB
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
  
          await User.create({
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
        }

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