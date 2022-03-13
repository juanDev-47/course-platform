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
  },
  Query: {
    getTrainingPlans: async () =>
      await prisma.trainingPlan.findMany({
        include: {
          Courses: true,
        },
      }),
    getTrainingPlan: async (parent, args) =>
      await prisma.trainingPlan.findUnique({
        where: {
          id: args.id,
        },
        include: {
          Courses: true,
        },
      }),
  },

  Mutation: {
    createTrainingPlan: async (parent, args) =>
      await prisma.trainingPlan.create({
        data: {
          ...args.data,
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
