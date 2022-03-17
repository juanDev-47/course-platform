import prisma from 'config/prisma';

const TrainingPlanResolvers = {
  TrainingPlan: {
    PlanComments: async (parent) =>
      await prisma.planComment.findMany({
        where: {
          trainingPlanId: parent.id,
        },
      }),
    UserTrainingPlan: async (parent) =>
      await prisma.userTrainingPlan.findMany({
        where: {
          trainingPlanId: parent.id,
        },
      }),
    Courses: async (parent) =>
      await prisma.course.findMany({
        where: {
          TrainingPlans: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
    numberOfCourses: async (parent) =>
      await prisma.course.count({
        where: {
          TrainingPlans: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
  },
  Query: {
    getTrainingPlans: async () => await prisma.trainingPlan.findMany({}),
    getTrainingPlan: async (parent, args) =>
      await prisma.trainingPlan.findUnique({
        where: {
          id: args.id,
        },
      }),
  },

  Mutation: {
    createTrainingPlan: async (parent, args) =>
      await prisma.trainingPlan.create({
        data: {
          ...args.data,
          Courses: {
            connect: [...args.data.Courses],
          },
        },
      }),
    updateTrainingPlan: async (parent, args) =>
      await prisma.trainingPlan.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      }),
    deleteTrainingPlan: async (parent, args) =>
      await prisma.trainingPlan.delete({
        where: { ...args.where },
      }),
  },
};

export { TrainingPlanResolvers };
