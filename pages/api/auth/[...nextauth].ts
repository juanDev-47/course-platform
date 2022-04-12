import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'config/prisma';

export default NextAuth({
  // Configure one or more authentication providers
  callbacks: {
    async session(session) {
      const modifiedSession = await prisma.session.findFirst({
        where: {
          userId: session.user.id,
        },
        include: {
          user: {
            include: {
              profile: {
                select: {
                  customImage: true,
                },
              },
              role: {
                select: {
                  id: true,
                  name: true,
                },
              },
              accounts: {
                select: {
                  providerAccountId: true,
                },
                where: {
                  userId: session.user.id,
                },
              },
            },
          },
        },
      });
      return modifiedSession as any;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      wellKnown: 'https://capacitations-management.us.auth0.com/',
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
      authorization: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=login`,
    }),
  ],
});
