import { useMutation, useQuery } from '@apollo/client';
import Table from '@components/Table';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import React, { useEffect, useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { Course } from 'interfaces/TrainingPlan';
import { toast } from 'react-toastify';
import { DELETE_COURSE } from 'graphql/mutations/courses';
import useRedirect from 'hooks/useRedirect';
import Loading from '@components/Loading';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { loading, push } = useRedirect();

  // query for bring the courses
  const resQuery = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (resQuery.data) {
      setCourses(resQuery.data.getCourses);
    }
  }, [resQuery.data]);

  const dataForm = courses.map((element) => {
    const item = {
      id: element.id,
      col1: element.name,
      col2: element.hours,
      col3: element.platform,
    };
    return item;
  });

  const onCreate = () => {
    push('/courses/form-course');
  };

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
    push(`/courses/form-course/${id}`);
  };

  if (resQuery.loading || loading || resDelete.loading) return <Loading />;

  return (
    <div className='mx-1 sm:mx-5 lg:mx-16 my-10'>
      <Table
        tableContext={{
          title: 'Delete Course',
          question: 'Are you sure you want to delete this course?',
          textDelete: 'Delete',
          onDelete,
          onEdit,
        }}
        data={dataForm}
        title='Courses'
        tittles={[
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
        ]}
        colsClass='grid-cols-4'
        onClickCreate={onCreate}
        textButtonCreate='New course'
      />
    </div>
  );
};

export default Index;
