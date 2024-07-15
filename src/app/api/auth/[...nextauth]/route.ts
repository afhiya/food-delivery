import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signIn } from "@/lib/service";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
          const user: any = await signIn(email);
          if (user) {
            const passwordConfirm = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordConfirm) {
              return user;
            }
          }
          return null;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
        if (account?.provider === "credentials" && user) {
          token.name = user.name;
          token.email = user.email;
          token.role = user.role;
        }
        return token;
    },
    async session({ session, token }: any) {
        if ("name" in token) session.user.name = token.name;
        if ("email" in token) session.user.email = token.email;
        if ("role" in token) session.user.role = token.role;
        return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
