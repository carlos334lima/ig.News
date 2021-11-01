import NextAuth from "next-auth";
import Provider from "next-auth/providers";

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRETS,
      scope: "read:user",
    }),
  ],
});
