import prisma from 'config/prisma';

const CourseNoteResolvers = {
  CourseNote: {
    user: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      }),
    numberOfLikes: async (parent, args) =>
      await prisma.user.count({
        where: {
          noteLikes: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
  },
  Query: {
    getCourseNotes: async () => await prisma.courseNote.findMany(),
    getCourseNote: async (parent, args) =>
      await prisma.courseNote.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    CreateCourseNote: async (parent, args) =>
      await prisma.courseNote.create({
        data: {
          note: args.data.note,
          user: {
            connect: args.data.userId,
          },
          course: {
            connect: args.data.courseId,
          },
        },
      }),
    addLike: async (parent, args) =>
      await prisma.courseNote.update({
        where: {
          id: args.data.id,
        },
        data: {
          likes: {
            connect: args.userId,
          },
        },
      }),
  },
};

export { CourseNoteResolvers };
