import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import NavBar from 'components/Navbar';

const PrivateLayout = ({ pageAuth, children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('auth0');
    return <Loading />;
  }

  // if (!pageAuth) {
  //   return <div>NO ACCESS </div>;
  // }

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

const Loading = () => <div>Loading ...</div>;

export default PrivateLayout;
