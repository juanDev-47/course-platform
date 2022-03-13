import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Home = () => (
  <h1 className='text-3xl text-blue-300 font-bold underline'>
    main page, (no needed (?) should show first page)
  </h1>
);

export default Home;
