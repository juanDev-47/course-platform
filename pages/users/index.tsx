import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Index = () => (
  <h1 className='text-3xl text-blue-300 font-bold underline'>
    from users list
  </h1>
);

export default Index;
