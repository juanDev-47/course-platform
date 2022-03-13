import prisma from 'config/prisma';

const CourceResolvers = {
  Query: {
    getCources: async () => await prisma.course.findMany(),
    getCource: async (parent, args) =>
      await prisma.course.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { CourceResolvers };
