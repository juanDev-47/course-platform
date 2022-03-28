import { useMutation, useQuery } from '@apollo/client';
import Table from '@components/Table';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { Course } from 'interfaces/TrainingPlan';
import { toast } from 'react-toastify';
import { DELETE_COURSE } from 'graphql/mutations/courses';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Index = () => {

  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  
  // query for bring the courses
  const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });

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

  // instance of useRouter for send params throught paths
  const router = useRouter();
  const onCreate = () => {
    router.push('/courses/create-course');
  }
  
  // deleting a course
  const [deleteCourse, resDelete] = useMutation(DELETE_COURSE, {
    refetchQueries: [GET_COURSES_FORMTRAINIGPLAN],
  });  

  const onDelete = async (idCourse: string) => {
    await deleteCourse({
      variables: {
        where: {
          id: idCourse,
        },
      },
    });
    if (resDelete.error) {
      toast.error('Error');
    } else {
      toast.success('Course deleted successfully');
    }
  };

  
  const onEdit = (id: string) => {
    router.push(`/courses/${id}`);
  }

  return (
    <Table tableContext={{title:'Delete Course',
                          question:'Are you sure you want to delete this course?',
                          textDelete: 'Delete',
                          onDelete,
                          onEdit
                                                  
  }}  data={dataForm} title='Courses' tittles={[
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

export default Index;