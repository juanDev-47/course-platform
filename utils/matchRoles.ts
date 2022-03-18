import { getSession } from 'next-auth/react';
import prisma from 'config/prisma';

const matchRoles = async (context: any) => {
  const data: any = await getSession({ req: context.req });
  const userRole = data?.user?.role?.name;

  const page = await prisma.page.findUnique({
    where: {
      path: context.resolvedUrl,
    },
    include: {
      roles: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: data?.user.id,
    },
    include: {
      Profile: true,
    },
  });

  return {
    auth: page?.roles.map((rol) => rol.name).includes(userRole),
    name: page?.name,
    user,
  };
};
export { matchRoles };
