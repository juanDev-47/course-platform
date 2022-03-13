import prisma from 'config/prisma';

const CourseNoteResolvers = {
  Query: {
    getCourseNotes: async () => await prisma.courseNote.findMany(),
    getCourseNote: async (parent, args) =>
      await prisma.courseNote.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
};

export { CourseNoteResolvers };
