import { useQuery } from '@apollo/client';
import Table from '@components/Table';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useRouter } from 'next/router';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const index =  () => {

  // query for bring the courses
  // const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
  //   fetchPolicy: 'cache-and-network',
  // });

  const router = useRouter();
  const onCreate = () => {
    router.push('/courses/create-course');
  }

  const data = [{id: "kdjhfksd",
          col1: "course 1",
          col2: 3,
          col3: "Youtube",
          }]
  
  const deleteCourse = (id: String) => {
    
  }

  
  const editCourse = (id: String) => {
    router.push('/courses/create-course');
  }

  // console.log(courses);
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
      }
    ]} onClickCreate={onCreate} textButtonCreate='New course'/>
  );
}

export default index;