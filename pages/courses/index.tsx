import React from 'react';
import { matchRoles } from 'utils/matchRoles';
// import prisma from 'config/prisma';

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

export default function Home({courses}:any) {
  console.log(courses);
  return (
    <h1 className='text-3xl text-blue-300 font-bold underline'>
      desde course ;
    </h1>
  );
}
