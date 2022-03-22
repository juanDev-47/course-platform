import { useQuery } from '@apollo/client';
import Table from '@components/Table';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { Course } from 'interfaces/TrainingPlan';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const index = () => {

  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  
  // query for bring the courses
  const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });

  // datos convertidos para mostrar en la tabla
  let dateForm: [] = [];


  useEffect(() => {
    if (data) {
      setAvailableCourses(data.getCourses);
    }
  }, [data]);

  // 
  let dataForm = availableCourses.map(element => {
    let item = {
      id: element.id,
      col1: element.name,
      col2: element.hours,
      col3: element.platform
    }
    return item
  });
  
  console.log(availableCourses)

  // instance of useRouter for send params throught paths
  const router = useRouter();
  const onCreate = () => {
    router.push('/courses/create-course');
  }
  
  const deleteCourse = (id: String) => {
    
  }

  
  const editCourse = (id: string) => {
    router.push({
      pathname: '/courses/create-course',
      query: { keyWord: id}
    });
  }

  // console.log(courses);  actionsContext={ActionsContext}
  return (
    <Table  data={dataForm} title='Courses' tittles={[
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