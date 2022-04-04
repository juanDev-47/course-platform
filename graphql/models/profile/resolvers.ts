import prisma from 'config/prisma';

const ProfileResolvers = {
  Query: {
    getUserProfile: async (parent, args) =>
      await prisma.profile.findUnique({
        where: {
          userId: args.userId,
        },
      }),
  },
  Mutation: {
    updateProfile: async (_: any, args: any) =>
      await prisma.profile.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
        },
      }),
    updateImage: async (parent, args) =>
      await prisma.profile.update({
        where: {
          userId: args.user,
        },
        data: {
          customImage: args.image,
        },
      }),
  },
};

export { ProfileResolvers };
