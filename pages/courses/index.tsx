import React from 'react';
import { matchRoles } from 'utils/matchRoles';
// import prisma from 'config/prisma';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

export default function Home({ courses }: any) {
  return (
    <h1 className='text-3xl text-blue-300 font-bold underline'>
      desde course ;
    </h1>
  );
}
