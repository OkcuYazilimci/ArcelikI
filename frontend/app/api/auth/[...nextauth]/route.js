import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../../backend/model/User';
import { connectToDB } from '../../../../utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
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

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          const { displayName, email, imageurl, blogs } = profile; // Extract relevant fields from the profile

          await User.create({
            email,
            displayName,
            imageurl,
            blogs: blogs || [], // Set blogs to an empty array if it doesn't exist in the profile
            createdAt: new Date(), // Set the creation date to the current date and time
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
