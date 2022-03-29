import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from 'components/Table';
import { GET_USER_TRAINING_PLANS_BY_USER } from 'graphql/queries/userTrainingPlan';
import useRedirect from 'hooks/useRedirect';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const UserTrainingPlan = () => {
  const { loading, push } = useRedirect();
  const { data: session }: any = useSession();
  const resQuery = useQuery(GET_USER_TRAINING_PLANS_BY_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserTrainingPlansByUserId: session.userId,
    },
  });
  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (resQuery.data) {
      setDataR(
        resQuery.data.getUserTrainingPlansByUser.map((item: any) => ({
          id: item.id,
          col1: item.trainingPlan.name,
          col2: item.trainingPlan.numberOfCourses,
          col3: `${item.progress}%`,
        }))
      );
    }
  }, [resQuery.data]);

  const onClickItem = (id: string) => {
    push(`/training-plans/training-plan-details/${id}`);
  };

  if (resQuery.loading || loading) return <Loading />;

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
