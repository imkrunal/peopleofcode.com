import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@server/lib/constants";
import { IdentityProvider } from "@prisma/client";
import prisma from "@lib/prisma";
import slugify from "slugify";
import { randomString } from "@lib/random";

const usernameSlug = (username: string) =>
  slugify(username, { lower: true }) + "-" + randomString(6).toLowerCase();

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
          avatar: existingUser.avatar,
          name: existingUser.name,
          username: existingUser.username,
        };
      };

      if (!user) {
        return await autoMergeIdentities();
      }

      if (account && account.type === "credentials") {
        return {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          name: user.name,
          username: user.username,
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
          avatar: existingUser.avatar,
          name: existingUser.name,
          username: existingUser.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const pocSession: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as number,
          username: token.username as string,
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
          await prisma.user.update({
            where: { email: user.email },
            data: {
              username: usernameSlug(user.name),
              name: user.name,
              avatar: user.image,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            username: usernameSlug(user.name),
            name: user.name,
            avatar: user.image,
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
