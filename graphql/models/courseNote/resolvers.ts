import prisma from 'config/prisma';

const CourseNoteResolvers = {
  Query: {
    getCourseNotes: async () => await prisma.courseNote.findMany(),
    getCourseNote: async (args) =>
      await prisma.courseNote.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { CourseNoteResolvers };
