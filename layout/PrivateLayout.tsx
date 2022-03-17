import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const PrivateLayout = ({ pageAuth, children }: any) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    signIn('auth0');
    return <Loading />;
  }

  if (!pageAuth) {
    return <div>NO ACCESS </div>;
  }

  return (
    <div>
      <button type='button' onClick={() => signOut()}>
        Logout
      </button>
      {children}
    </div>
  );
};

const Loading = () => <div>Loading ...</div>;

export default PrivateLayout;
