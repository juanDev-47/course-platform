import React from 'react';
// import prisma from 'config/prisma';


export default function Home({courses}:any) {
  console.log(courses);
  return (
    <h1 className='text-3xl text-blue-300 font-bold underline'>
      desde course ;
    </h1>
  );
}
