import prisma from 'config/prisma';
import { finished } from 'stream';

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

  Mutation: {
    changeState: async (parent, args) =>
      await prisma.userCourse.update({
          where: {
            id: args.inputUpdateState.id,
          },
          data: {
            finish: args.inputUpdateState.state
          }
        })
      ,
    uploadCertificate: async (parent, args) => 
    await prisma.userCourse.update({
      where: {
        id: args.data.id
      },
      data: {
        certificate: args.data.certificate
      }
    })
  }
};

export { UserCourseResolvers };
