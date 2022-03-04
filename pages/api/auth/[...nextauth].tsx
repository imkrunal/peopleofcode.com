import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@server/lib/constants";
import { IdentityProvider } from "@prisma/client";
import prisma from "@lib/prisma";

const providers: Provider[] = [
  GoogleProvider({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  }),
];

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      const autoMergeIdentities = async () => {
        const existingUser = await prisma.user.findFirst({
          where: { email: token.email! },
        });

        if (!existingUser) {
          return token;
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
        };
      };

      if (!user) {
        return await autoMergeIdentities();
      }

      if (account && account.type === "credentials") {
        return {
          id: user.id,
          email: user.email,
        };
      }

      if (
        account &&
        account.type === "oauth" &&
        account.provider &&
        account.providerAccountId
      ) {
        let idP: IdentityProvider = IdentityProvider.GOOGLE;
        const existingUser = await prisma.user.findFirst({
          where: {
            AND: [
              {
                identityProvider: idP,
              },
              {
                identityProviderId: account.providerAccountId as string,
              },
            ],
          },
        });

        if (!existingUser) {
          return await autoMergeIdentities();
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
        };
      }
      return token;
    },
    async session({ session }) {
      const pocSession: Session = {
        ...session,
        user: {
          ...session.user,
        },
      };
      return pocSession;
    },
    async signIn({ user, account, profile }) {
      if (account.type === "credentials") {
        return true;
      }
      if (account.type !== "oauth") {
        return false;
      }
      if (!user.email) {
        return false;
      }
      if (!user.name) {
        return false;
      }
      if (account.provider) {
        let idP: IdentityProvider = IdentityProvider.GOOGLE;
        user.email_verified = user.email_verified || profile.email_verified;

        if (!user.email_verified) {
          return "/auth/error?error=unverified-email";
        }

        const existingUserWithEmail = await prisma.user.findFirst({
          where: { email: user.email },
        });

        if (existingUserWithEmail) {
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            identityProvider: idP,
            identityProviderId: user.id as string,
            emailVerifiedAt: new Date(Date.now()),
          },
        });

        return true;
      }

      return false;
    },
  },
});
