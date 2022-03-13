import prisma from 'config/prisma';

const UserResolvers = {
  Query: {
    getUsers: async () => await prisma.user.findMany(),
    getUser: async (args) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { UserResolvers };
