import React from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const courses = await prisma.course.findMany();
  // console.log(courses);
  return {
    props: {
      courses: JSON.parse(safeJsonStringify(courses)),
    }, // will be passed to the page component as props
  }
}

export default function Home({courses}:any) {
  console.log(courses);
  return (
    <h1 className='text-3xl text-blue-300 font-bold underline'>
      desde course ;
    </h1>
  );
}
