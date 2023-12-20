import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../model/User';
import { connectToDB } from '../../../../utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

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

          await User.create({
            googleId,
            displayName,
            firstName,
            lastName,
            email,
            imageurl,
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
