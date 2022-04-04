import prisma from 'config/prisma';

const RoleResolvers = {
  Query: {
    getRoles: async () => await prisma.role.findMany(),
  },
};

export { RoleResolvers };
