import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  database: process.env.MONGO_URL,
  secret: process.env.JWT_SECRET,
  callbacks: {
    session: async ({ session }) => {
      return Promise.resolve(session);
    },
  },
});