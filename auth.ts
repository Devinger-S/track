import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"


export const authConfig = {
  adapter: PrismaAdapter(prisma),
  secret: '019f21cd217855d2230d085898ee1aaf9f9a474896c29a461b180e8a70a0e858',
  providers: [Google,
    // credentialsConfig
  ],
  events: {
    signIn: async ({ user, account, profile }) => {
      console.log('User signed in:', user);
      // console.log('Account:', account);
      // console.log('Profile:', profile);

    }

  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname = "/track") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
