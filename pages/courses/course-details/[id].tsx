import { useQuery } from '@apollo/client';
import Table from '@components/Table';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const CourseDetails = () => {
  const { data, loading } = useQuery(GET_USER_TRAINING_PLAN_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserTrainingPlanId: id,
    },
  });

  const { data: session }: any = useSession();
  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (data) {
      setDataR(
        data.getUserTrainingPlan.UserCourse.map((item: any) => ({
          id: item.id,
          col1: item.course.name,
          col2: item.course.hours,
          col3: item.course.platform,
          col4: item.course.link,
          col5: item.finish ? 'Finished' : 'In processes',
        }))
      );
    }
  }, [data]);
  return (
    <Table
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
        {
          title: 'Link',
          keyCol: 'col4',
        },
        {
          title: 'Status',
          keyCol: 'col5',
        },
      ]}
      colsClass='grid-cols-4'
      data={dataR}
    />
  );
};

export default CourseDetails;
