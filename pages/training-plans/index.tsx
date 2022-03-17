/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from 'components/Table';
import { GET_TRAININGPLANS } from 'graphql/queries/trainingPlan';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const index = () => {
  const { data, loading } = useQuery(GET_TRAININGPLANS, {
    fetchPolicy: 'cache-and-network',
  });
  const router = useRouter();
  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (data) {
      setDataR(
        data.getTrainingPlans.map((item: any) => ({
          id: item.id,
          col1: item.name,
          col2: item.numberOfCourses,
        }))
      );
    }
  }, [data]);

  const onClickCreate = () => {
    router.push('/training-plans/form-trainig-plan');
  };

  if (loading) return <Loading />;

  return (
    <div className='mt-52 mx-16'>
      <Table
        title='Training Plans'
        textButtonCreate='New training Plan'
        onClickCreate={onClickCreate}
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
        ]}
        data={dataR}
      />
    </div>
  );
};

export default index;
