import Table from '@components/Table';
import { useRouter } from 'next/router';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';
// import prisma from 'config/prisma';

// export async function getServerSideProps(context: any) {
//   return {
//     props: { ...(await matchRoles(context)) },
//   };
// }

const index =  ({courses}:any) => {
  // const { data } = useQuery(CREATE_COURSE);

  const router = useRouter();
  const onCreate = () => {
    router.push('/courses/create-course');
  }

  const data = [{id: "kdjhfksd",
          col1: "course 1",
          col2: 3,
          col3: "Youtube",
          }]
  

  console.log(courses);
  return (
    <Table data={data} title='Courses' tittles={[
      {
        title: 'Name',
        keyCol: 'col1',
      },
      {
        title: 'Hours',
        keyCol: 'col2',
      },
      {
        title: 'Platform',
        keyCol: 'col3',
      },
      {
        title: 'Actions',
        keyCol: 'col4',
      }
    ]} onClickCreate={onCreate} textButtonCreate='New course'/>
  );
}

export default index;