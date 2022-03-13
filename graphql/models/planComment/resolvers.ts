import prisma from 'config/prisma';

const PlanCommentResolvers = {
  Query: {
    getPlanComments: async () => await prisma.planComment.findMany(),
    getPlanComment: async (parent, args) =>
      await prisma.planComment.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { PlanCommentResolvers };
