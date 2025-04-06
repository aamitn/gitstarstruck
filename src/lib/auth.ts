import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';
import type { AuthOptions, User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { SessionStrategy } from 'next-auth';

// Extend the User type to include custom fields if needed (like role)
type ExtendedUser = User & {
  id: string;
  role?: string;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          ...user,
          id: user.id.toString(),
        } as ExtendedUser;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: +token.sub },
        });

        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id.toString(),
            role: dbUser.role,
          };
        }
      }

      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: ExtendedUser }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
