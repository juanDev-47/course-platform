import prisma from 'config/prisma';

const UserTrainingPlanResolvers = {
  UserTrainingPlan: {
    progress: async (parent, args) => {
      const { UserCourse } = await prisma.userTrainingPlan.findUnique({
        where: {
          id: parent.id,
        },
        include: {
          UserCourse: true,
        },
      });

      let finalizados = 0;
      UserCourse.map((item) => {
        if (item.finish) {
          finalizados += 1;
        }
      });
      return finalizados / UserCourse.length;
    },
  },

  Query: {
    getUserTrainingPlans: async () => await prisma.userTrainingPlan.findMany(),
    getUserTrainingPlan: async (parent, args) =>
      await prisma.userTrainingPlan.findUnique({
        where: {
          id: args.id,
        },
      }),
    getUserTrainingPlanByUser: async (parent, args) =>
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
