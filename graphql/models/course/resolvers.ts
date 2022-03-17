import prisma from 'config/prisma';

const CourseResolvers = {
  Query: {
    getCourses: async () => await prisma.course.findMany(),
    getCourse: async (parent, args) =>
      await prisma.course.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { CourseResolvers };
