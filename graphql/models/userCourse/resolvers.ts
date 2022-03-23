import prisma from 'config/prisma';

const UserCourseResolvers = {
  UserCourse: {
    course: async (parent, args) => {
      const data = await prisma.userCourse.findUnique({
        where: {
          id: parent.id,
        },
        include: {
          course: true,
        },
      });
      return data?.course;
    },
  },
  Query: {
    getUserCourses: async () => await prisma.userCourse.findMany(),
    getUserCourse: async (parent, args) =>
      await prisma.userCourse.findUnique({
        where: {
          id: args.id,
        },
        include: {
          course: true,
        },
      }),
  },
};

export { UserCourseResolvers };
