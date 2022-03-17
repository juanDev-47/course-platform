import prisma from 'config/prisma';

const CoursesResolvers = {
  Query: {
    getCourses: async () => (
         await prisma.course.findMany()  
    )
    },
};

export { CoursesResolvers };