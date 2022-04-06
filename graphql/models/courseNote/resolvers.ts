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
    isLike: async (parent, args, contex) => {
      const courseNote = await prisma.courseNote.findMany({
        where: {
          id: parent.id,
          likes: {
            some: {
              id: {
                equals: contex.session.userId,
              },
            },
          },
        },
      });

      return courseNote.length > 0;
    },
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
    addLike: async (parent, args) => {
      if (args.data.isLike) {
        return await prisma.courseNote.update({
          where: {
            id: args.data.id,
          },
          data: {
            likes: {
              disconnect: args.data.userId,
            },
          },
        });
      }
      return await prisma.courseNote.update({
        where: {
          id: args.data.id,
        },
        data: {
          likes: {
            connect: args.data.userId,
          },
        },
      });
    },
  },
};

export { CourseNoteResolvers };
