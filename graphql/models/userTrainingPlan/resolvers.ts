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
    getTrainingChartData: async (parent, args) => {
      const today = new Date();
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      monthAgo.setHours(0, 0, 0, 0);
      const plans: [] =
        await prisma.$queryRaw`SELECT u."name" as x, count(uc.finish) as y  FROM public."User" u join "UserCourse" uc ON u.id =uc."userId" and uc.finish =true and uc."updatedAt" >= ${monthAgo}
        and uc."updatedAt"< ${today} group by u.id order by y desc`;
      return plans.slice(0, 3);
    },
  },
  Mutation: {
    updateUserTrainingPlans: async (parent, args) => {
      const planIds = args.data.map((pu) => pu.trainingPlanId);
      await prisma.userTrainingPlan.deleteMany({
        where: { userId: args.user, trainingPlanId: { notIn: planIds } },
      });
      args.data.forEach(async (pu) => {
        const newPU = await prisma.userTrainingPlan.upsert({
          where: { userId_trainingPlanId: pu },
          create: pu,
          update: {},
        });
        await prisma.userTrainingPlan.update({
          where: { id: newPU.id },
          data: {
            UserCourse: {
              connectOrCreate: (
                await prisma.course.findMany({
                  where: {
                    TrainingPlans: {
                      some: {
                        id: pu.trainingPlanId,
                      },
                    },
                  },
                })
              ).map((c) => ({
                where: {
                  userId_courseId: {
                    courseId: c.id,
                    userId: args.user,
                  },
                },
                create: {
                  userId: args.user,
                  courseId: c.id,
                  finish: false,
                },
              })),
            },
          },
        });
      });
    },
  },
};

export { UserTrainingPlanResolvers };
