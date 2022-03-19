import { matchRoles } from 'utils/matchRoles';
import React from 'react';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Home = () => (
  <div>
    <h1 className='text-3xl text-blue-300 font-bold underline'>
      Hello world! ;
    </h1>
  </div>
);

export default Home;
