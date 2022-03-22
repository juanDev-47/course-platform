/* eslint-disable spaced-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from 'components/Table';
import { DELETE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import { GET_TRAININGPLANS } from 'graphql/queries/trainingPlan';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const index = () => {
  const { data, loading } = useQuery(GET_TRAININGPLANS, {
    fetchPolicy: 'cache-and-network',
  });
  const [deleteTrainingPlan, resDelete] = useMutation(DELETE_TRAININGPLAN, {
    refetchQueries: [GET_TRAININGPLANS],
  });

  const onDelete = async (idTrainingPlan: string) => {
    await deleteTrainingPlan({
      variables: {
        where: {
          id: idTrainingPlan,
        },
      },
    });
    if (resDelete.error) {
      toast.error('Error');
    } else {
      toast.success('Training plan deleted successfully');
    }
  };

  const onEdit = (id: string) => {
    router.push(`/training-plans/form-trainig-plan/${id}`);
  };

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
    router.push('/training-plans/form-trainig-plan/');
  };

  if (loading || resDelete.loading) return <Loading />;

  return (
    <div className='mt-52 mx-16'>
      <Table
        actionsContext={{
          question: 'Are you sure you want to delete this training plan? ',
          textDelete: 'Delete',
          title: 'Delete training plan',
          onDelete,
          onEdit,
        }}
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
