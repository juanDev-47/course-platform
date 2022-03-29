import { getSession } from 'next-auth/react';
import prisma from 'config/prisma';

const matchRoles = async (context: any) => {
  let url = context.resolvedUrl;

  const { id } = context.query;

  if (id) {
    url = url.replace(id, '[id]');
  }

  const { userName } = context.query;

  if (userName) {
    url = url.replace(userName, '[userName]');
  }
  const data: any = await getSession({ req: context.req });
  const userRole = data?.user?.role?.name;

  const page = await prisma.page.findUnique({
    where: {
      path: url,
    },
    include: {
      roles: true,
    },
  });

  return {
    auth: page?.roles.map((rol) => rol.name).includes(userRole),
    name: page?.name,
    user: data?.user,
  };
};
export { matchRoles };
