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
        data:{
          ...args.data
        }
      });
      return newCourse;
    },

    updateCourse: async (parent, args) => 
      await prisma.course.update({
        where: { ...args.where },
        data: {
          ...args.data,
        },
      }), 

    deleteCourse: async (parent, args) =>
      await prisma.course.delete({
        where: { ...args.where },
      }),

  },
};

export { CourseResolvers };
