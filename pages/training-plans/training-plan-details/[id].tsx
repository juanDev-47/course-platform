import { useMutation, useQuery } from '@apollo/client';
import CommentDiv from '@components/CommentDiv';
import CommentItem from '@components/CommentItem';
import DetailDiv from '@components/DetailDiv';
import DetailSpan from '@components/DetailSpan';
import Loading from '@components/Loading';
import Table from '@components/Table';
import { CREATE_PLAN_COMMENT } from 'graphql/mutations/planComment';
import { GET_USER_TRAINING_PLAN_ID } from 'graphql/queries/userTrainingPlan';
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

const TrainingPlanDetails = () => {
  const { loading, router, push } = useRedirect();
  const idTrainingPlan = router.query ? router.query.id : '';

  const resQuery = useQuery(GET_USER_TRAINING_PLAN_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserTrainingPlanId: idTrainingPlan,
    },
  });

  const [createPlanComment, resCreate] = useMutation(CREATE_PLAN_COMMENT, {
    refetchQueries: [GET_USER_TRAINING_PLAN_ID],
  });
  const { data: session }: any = useSession();
  const [dataR, setDataR] = useState([{}]);
  useEffect(() => {
    if (resQuery.data) {
      setDataR(
        resQuery.data.getUserTrainingPlan.UserCourse.map((item: any) => ({
          id: item.id,
          col1: item.course.name,
          col2: item.course.hours,
          col3: item.course.platform,
          col4: item.finish ? 'Finished' : 'In processes',
        }))
      );
    }
  }, [resQuery.data]);

  const onSend = async (dataComment: string) => {
    await createPlanComment({
      variables: {
        data: {
          comment: dataComment,
          userId: {
            id: session.user.id,
          },
          trainingPlanId: {
            id: resQuery.data.getUserTrainingPlan.trainingPlan.id,
          },
        },
      },
    });
  };

  const onClickItem = async (id: string) => {
    push(`/courses/course-details/${id}`);
  };

  if (resQuery.loading || resCreate.loading || loading) return <Loading />;

  return (
    <div className='mt-8 flex flex-col gap-5 mx-1 sm:mx-5 lg:mx-16 my-10 overflow-hidden'>
      <DetailDiv title={resQuery.data.getUserTrainingPlan.trainingPlan.name}>
        <div className='flex flex-col gap-5 w-full'>
          <div className='flex flex-col sm:flex-row justify-around gap-5 w-full'>
            <DetailSpan
              title='Number of courses'
              data={
                resQuery.data.getUserTrainingPlan.trainingPlan.numberOfCourses
              }
            />
            <DetailSpan
              title='Progress'
              data={resQuery.data.getUserTrainingPlan.progress}
            />
          </div>
          <DetailSpan
            title='Description'
            data={resQuery.data.getUserTrainingPlan.trainingPlan.description}
          />
        </div>
      </DetailDiv>

      <Table
        title='Courses'
        tableContext={{
          onClickItem,
        }}
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
            title: 'Status',
            keyCol: 'col4',
          },
        ]}
        colsClass='grid-cols-4'
        data={dataR}
      />

      <CommentDiv
        onSend={onSend}
        imageUser={session.user.image}
        title='Comments'
        comments={resQuery.data.getUserTrainingPlan.trainingPlan.PlanComments}
        ItemComponent={CommentItem}
      />
    </div>
  );
};

export default TrainingPlanDetails;
