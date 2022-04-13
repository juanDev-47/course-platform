import { useMutation, useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from 'components/Table';
import { DELETE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import { GET_TRAININGPLANS } from 'graphql/queries/trainingPlan';
import useRedirect from 'hooks/useRedirect';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Index = () => {
  const { loading, push } = useRedirect();
  const resQuery = useQuery(GET_TRAININGPLANS, {
    fetchPolicy: 'cache-and-network',
  });
  const [deleteTrainingPlan, resDelete] = useMutation(DELETE_TRAININGPLAN, {
    refetchQueries: [GET_TRAININGPLANS],
  });

  const onDelete = async (idTrainingPlan: string) => {
    try {
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
      
    } catch (error) {
      toast.error('Unable to delete plan');
    };
    }

  const onViewNotes = (id: string) => {
    push(`/training-plans/training-plan-details/admin/${id}`);
  };

  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (resQuery.data) {
      setDataR(
        resQuery.data.getTrainingPlans.map((item: any) => ({
          id: item.id,
          col1: item.name,
          col2: item.numberOfCourses,
        }))
      );
    }
  }, [resQuery.data]);

  const onClickItem = (id: string) => {
    push(`/training-plans/form-training-plan/${id}`);
  };
  const onClickCreate = () => {
    push('/training-plans/form-training-plan/');
  };

  if (resQuery.loading || resDelete.loading || loading) return <Loading />;

  return (
    <div className='mx-2 my-10 md:mx-16'>
      <Table
        tableContext={{
          question: 'Are you sure you want to delete this training plan? ',
          textDelete: 'Delete',
          title: 'Delete training plan',
          onDelete,
          onViewNotes,
          onClickItem,
        }}
        title='Training Plans'
        textButtonCreate='New training Plan'
        onClickCreate={onClickCreate}
        tittles={[
          {
            title: 'Name',
            keyCol: 'col1',
          },
          {
            title: 'Number of courses',
            keyCol: 'col2',
          },
        ]}
        colsClass='grid-cols-3'
        data={dataR}
      />
    </div>
  );
};

export default Index;
