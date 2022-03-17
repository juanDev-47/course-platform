import prisma from 'config/prisma';

const UserTrainingPlanResolvers = {
  Query: {
    getUserTrainingPlans: async () => await prisma.userTrainingPlan.findMany(),
    getUserTrainingPlan: async (parent, args) =>
      await prisma.userTrainingPlan.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { UserTrainingPlanResolvers };
