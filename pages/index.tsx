import table from 'components/Table';
import React from 'react';

export async function getServerSideProps(context:any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl text-blue-300 font-bold underline'>
        Hello world! ;
      </h1>
    </div>
  );
}

export default Home
