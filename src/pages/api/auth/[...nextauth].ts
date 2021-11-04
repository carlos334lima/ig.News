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

  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        //create user database
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data : { email } }
            ),
            q.Get(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
            )
          )
        )
        return true;
      } catch {
        return false;
      }
    },
  },
});
