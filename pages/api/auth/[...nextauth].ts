import { ErrorCode, verifyPassword } from "@lib/auth";
import prisma from "@lib/prisma";
import { IdentityProvider, UserPermissionRole } from "@prisma/client";
import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const providers: Provider[] = [
  CredentialsProvider({
    id: "credentials",
    name: "Popleofcode.com",
    type: "credentials",
    credentials: {
      email: {
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "Your super secure password",
      },
    },
    async authorize(credentials) {
      if (!credentials) {
        console.error(`For some reason credentials are missing`);
        throw new Error(ErrorCode.InternalServerError);
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email.toLocaleLowerCase() },
      });

      if (!user) {
        throw new Error(ErrorCode.UserNotFound);
      }

      if (user.identityProvider !== IdentityProvider.PEOPLEOFCODE) {
        throw new Error(ErrorCode.ThirdPartyIdentityProviderEnabled);
      }

      if (!user.password) {
        throw new Error(ErrorCode.UserMissingPassword);
      }

      const isCorrectPassword = await verifyPassword(
        credentials.password,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error(ErrorCode.IncorrectPassword);
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
  }),
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  }),
];

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  providers,
  callbacks: {
    async session({ session, token }) {
      const pocSession: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as number,
          name: token.name,
          username: token.username as string,
          role: token.role as UserPermissionRole,
        },
      };
      return pocSession;
    },
  },
});
