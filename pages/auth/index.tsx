import React from 'react';
import PrivateComponent from 'components/PrivateComponent';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const AuthExample = () => (
  <>
    <h1 className='text-3xl text-blue-300 font-bold underline'>AuthExample</h1>
    <PrivateComponent roleList={['Admin']}>
      <div>Show if has access EXAMP</div>
    </PrivateComponent>
  </>
);

export default AuthExample;
