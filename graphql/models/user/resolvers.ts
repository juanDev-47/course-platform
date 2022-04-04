import prisma from 'config/prisma';

const UserResolvers = {
  Query: {
    getUsers: async () => await prisma.user.findMany(),
    getUser: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          profile: true,
          role: true,
        },
      }),
  },
  Mutation: {
    createUser: async (parent, args) =>
      await prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
          roleId: args.data.roleId,
          image: args.data.image,
          accounts: {
            create: [
              {
                providerAccountId: args.data.auth0Id,
                type: 'oauth',
                provider: 'auth0',
              },
            ],
          },
          profile: {
            create: {
              ...args.data.profile,
            },
          },
        },
      }),
  },
};

export { UserResolvers };
