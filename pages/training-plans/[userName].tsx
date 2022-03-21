/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from 'components/Table';
import { GET_USER_TRAINING_PLAN_BY_USER } from 'graphql/queries/userTrainingPlan';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const userTrainingPlan = () => {
  const { data: session }: any = useSession();
  const { data, loading } = useQuery(GET_USER_TRAINING_PLAN_BY_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserTrainingPlanByUserId: session.userId,
    },
  });

  const router = useRouter();
  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (data) {
      setDataR(
        data.getUserTrainingPlanByUser.map((item: any) => ({
          id: item.trainingPlan.id,
          col1: item.trainingPlan.name,
          col2: item.trainingPlan.numberOfCourses,
          col3: item.progress,
        }))
      );
    }
  }, [data]);

  const onClickItem = (id: string) => {};

  if (loading) return <Loading />;

  return (
    <div className='mt-52 mx-16'>
      <Table
        tableContext={{
          onClickItem,
        }}
        title='Training Plans'
        tittles={[
          {
            title: 'Name',
            keyCol: 'col1',
            customClass: 'col-span-2',
          },
          {
            title: 'Number of courses',
            keyCol: 'col2',
          },
          {
            title: 'Progress',
            keyCol: 'col3',
          },
        ]}
        data={dataR}
      />
    </div>
  );
};

export default userTrainingPlan;
