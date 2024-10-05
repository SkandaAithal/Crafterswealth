import { NextAuthOptions, Session, User, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import {
  SessionObject,
  UserDetails,
  UserObject,
} from "@/lib/types/common/user";
import { handleGoogleSignIn, handleCredentialsSignIn } from "./handlers";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          return await handleCredentialsSignIn(credentials ?? {});
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google") {
        const googleSignInData = await handleGoogleSignIn(user);
        if (googleSignInData) {
          (user as UserObject).authToken = googleSignInData.authToken;
          (user as UserObject).userDetails = googleSignInData.userDetails;
          return true;
        }
        return false;
      }

      return account?.provider === "credentials";
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      (session as SessionObject).authToken = token.authToken as string;
      (session as SessionObject).userDetails = token.userDetails as UserDetails;
      return session;
    },

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.authToken = (user as UserObject).authToken;
        token.userDetails = (user as UserObject).userDetails;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    maxAge: 60 * 60 * 24 * 7,
  },
};
