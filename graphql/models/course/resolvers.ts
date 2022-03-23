import prisma from 'config/prisma';

const CourseResolvers = {
  Query: {
    getCourses: async () => await prisma.course.findMany(),
    getCourse: async (parent: any, args: { id: any }) =>
      await prisma.course.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    createCourse: async (parent, args) => {
      const newCourse = await prisma.course.create({
        data: {
          name: args.name,
          hours: args.hours,
          platform: args.platform,
          link: args.link,
        },
      });
      return newCourse;
    },
  },
};

export { CourseResolvers };
