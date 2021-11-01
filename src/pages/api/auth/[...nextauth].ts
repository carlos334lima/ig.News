import NextAuth from "next-auth";
import Provider from "next-auth/providers";

//@libraries
import { query as q } from "faunadb";

//@utils
import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRETS,
      scope: "read:user",
    }),
  ],
  jwt: {
    signingKey: process.env.SIGNIN_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        //create user database
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));

        return true;
      } catch {
        return false;
      }
    },
  },
});
