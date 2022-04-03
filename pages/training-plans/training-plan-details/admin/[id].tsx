import { useQuery } from '@apollo/client';
import CommentDiv from '@components/CommentDiv';
import CommentItem from '@components/CommentItem';
import Loading from '@components/Loading';
import { GET_TRAINING_PLAN_COMMENTS } from 'graphql/queries/trainingPlan';
import useRedirect from 'hooks/useRedirect';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const TrainingPlanComments = () => {
  const { router } = useRedirect();

  const idTrainingPlan = router.query ? router.query.id : '';

  const { data, loading } = useQuery(GET_TRAINING_PLAN_COMMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getTrainingPlanId: idTrainingPlan,
    },
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='mt-8 flex flex-col gap-5 mx-1 sm:mx-5 lg:mx-16 my-10 overflow-hidden pointer-events-none'>
      <CommentDiv
        title='Comments'
        comments={data.getTrainingPlan.PlanComments}
        ItemComponent={CommentItem}
      />
    </div>
  );
};

export default TrainingPlanComments;
