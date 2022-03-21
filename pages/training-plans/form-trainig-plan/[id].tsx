/* eslint-disable spaced-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  GET_TRAININGPLANS,
  GET_TRAININGPLAN_EDIT,
} from 'graphql/queries/trainingPlan';
import FormTrainingPlan from '@components/FormTrainingPlan';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const formTrainingPlan = () => {
  const router = useRouter();
  const { id } = router.query || '';
  const [updateTrainingPlan, resUpdate] = useMutation(UPDATE_TRAININGPLAN, {
    refetchQueries: [GET_TRAININGPLANS],
  });
  const resQuery = useQuery(GET_TRAININGPLAN_EDIT, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getTrainingPlanId: id,
    },
  });

  const onSubmit = async (data: any) => {
    await updateTrainingPlan({
      variables: {
        where: {
          id,
        },
        data: {
          name: {
            set: data.name,
          },
          description: {
            set: data.description,
          },
          Courses: data.selectCourses.map((course: any) => ({ id: course.id })),
        },
      },
    });
    if (resUpdate.error) {
      toast.error('Error');
    } else {
      router.push('/training-plans');
      toast.success('Training plan edited successfully');
    }
  };

  if (resUpdate.loading || resQuery.loading) return <Loading />;

  return (
    <FormTrainingPlan
      dataForm={{
        title: 'Edit training plan',
        textSubmit: 'Edit',
        name: resQuery.data.getTrainingPlan.name,
        description: resQuery.data.getTrainingPlan.description,
        selectCourses: resQuery.data.getTrainingPlan.Courses,
        availableCourses: resQuery.data.getTrainingPlan.AvailableCourses,
      }}
      onSubmit={onSubmit}
    />
  );
};

export default formTrainingPlan;
