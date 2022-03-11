import prisma from 'config/prisma';

const TrainingPlanResolvers = {
  Query: {
    getTrainingPlans: async () => await prisma.trainingPlan.findMany(),
  },
};

export { TrainingPlanResolvers };
