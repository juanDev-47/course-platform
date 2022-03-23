import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from 'components/Table';
import { GET_USER_TRAINING_PLANS_BY_USER } from 'graphql/queries/userTrainingPlan';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const UserTrainingPlan = () => {
  const { data: session }: any = useSession();
  const { data, loading } = useQuery(GET_USER_TRAINING_PLANS_BY_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserTrainingPlansByUserId: session.userId,
    },
  });

  const router = useRouter();
  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (data) {
      setDataR(
        data.getUserTrainingPlansByUser.map((item: any) => ({
          id: item.id,
          col1: item.trainingPlan.name,
          col2: item.trainingPlan.numberOfCourses,
          col3: `${item.progress}%`,
        }))
      );
    }
  }, [data]);

  const onClickItem = (id: string) => {
    router.push(`/training-plans/training-plan-details/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className='mx-1 sm:mx-5 lg:mx-16 my-10'>
      <Table
        tableContext={{
          onClickItem,
        }}
        title='Training Plans'
        colsClass='grid-cols-4'
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

export default UserTrainingPlan;
