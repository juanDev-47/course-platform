import prisma from 'config/prisma';

const PlanCommentResolvers = {
  PlanComment: {
    user: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      }),
  },
  Query: {
    getPlanComments: async () => await prisma.planComment.findMany(),
    getPlanComment: async (parent, args) =>
      await prisma.planComment.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    createPlanComment: async (parent, args) =>
      await prisma.planComment.create({
        data: {
          comment: args.data.comment,
          trainingPlan: {
            connect: args.data.trainingPlanId,
          },
          user: {
            connect: args.data.userId,
          },
        },
      }),
  },
};

export { PlanCommentResolvers };
