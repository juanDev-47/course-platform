import prisma from 'config/prisma';
import { UserTrainingPlanResolvers } from 'graphql/models/userTrainingPlan/resolvers';

const UserResolvers = {
  EmployeePlans: {
    UserTrainingPlan: async (parent) =>
      UserTrainingPlanResolvers.Query.getUserTrainingPlansByUser(null, parent),
    availablePlans: async (parent) =>
      await prisma.trainingPlan.findMany({
        where: {
          UserTrainingPlan: {
            none: {
              userId: parent.id,
            },
          },
        },
      }),
  },
  Query: {
    getUsers: async () => await prisma.user.findMany(),
    getEmployees: async () =>
      await prisma.user.findMany({
        where: {
          role: {
            name: 'Employee',
          },
        },
      }),
    getEmployee: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      }),
    getUser: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          profile: true,
          role: true,
        },
      }),
  },
  Mutation: {
    createUser: async (parent, args) =>
      await prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
          roleId: args.data.roleId,
          image: args.data.image,
          accounts: {
            create: [
              {
                providerAccountId: args.data.auth0Id,
                type: 'oauth',
                provider: 'auth0',
              },
            ],
          },
          profile: {
            create: {
              ...args.data.profile,
            },
          },
        },
      }),
  },
};

export { UserResolvers };
