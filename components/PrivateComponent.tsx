import React from 'react';
import { useSession } from 'next-auth/react';

const PrivateComponent = ({ roleList, children }: any) => {
  const { data: session }: any = useSession();
  const roleUser = session && session.user ? session.user.role.name : 'Dev';
  const roleCheck = roleList.includes(roleUser);

  return roleCheck ? children : <></>;
};

export default PrivateComponent;
