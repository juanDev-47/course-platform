import React from 'react'
import { matchRoles } from 'utils/matchRoles';


export async function getServerSideProps(context:any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

const Index = () => {
  return (
    <h1 className='text-3xl text-blue-300 font-bold underline'>
      from users list
    </h1>
  );
}

export default Index