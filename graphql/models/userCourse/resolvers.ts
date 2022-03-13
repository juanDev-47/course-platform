import prisma from 'config/prisma';

const UserCourseResolvers = {
  Query: {
    getUserCourses: async () => await prisma.userCourse.findMany(),
    getUserCourse: async (parent, args) =>
      await prisma.userCourse.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { UserCourseResolvers };
