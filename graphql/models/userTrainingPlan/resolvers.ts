import prisma from 'config/prisma';

const UserTrainingPlanResolvers = {
  UserTrainingPlan: {
    progress: async (parent, args) => {
      const length = await prisma.userCourse.count({
        where: {
          userTraining: {
            some: {
              id: parent.id,
            },
          },
        },
      });

      const finishLength = await prisma.userCourse.count({
        where: {
          userTraining: {
            some: {
              id: parent.id,
            },
          },
          finish: true,
        },
      });

      return Math.trunc((finishLength / length) * 100);
    },
    UserCourse: async (parent, args) =>
      await prisma.userCourse.findMany({
        where: {
          userTraining: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
  },
  Query: {
    getUserTrainingPlans: async () => await prisma.userTrainingPlan.findMany(),
    getUserTrainingPlan: async (parent, args) =>
      await prisma.userTrainingPlan.findUnique({
        where: {
          id: args.id,
        },
        include: {
          trainingPlan: true,
        },
      }),
    getUserTrainingPlansByUser: async (parent, args) =>
      await prisma.userTrainingPlan.findMany({
        where: {
          userId: args.id,
        },
        include: {
          trainingPlan: true,
        },
      }),
  },
};

export { UserTrainingPlanResolvers };
