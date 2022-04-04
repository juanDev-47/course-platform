import { getSession } from 'next-auth/react';
import prisma from 'config/prisma';

const matchRoles = async (context: any) => {
  let url = context.resolvedUrl as string;

  const id = context.query ? context.query.id : '';

  if (id) {
    url = url.replace(id, '[id]').replace(/\?(.*)/, '');
  }

  const { userName } = context.query;

  if (userName) {
    url = url.replace(userName, '[userName]').replace(/\?(.*)/, '');
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
