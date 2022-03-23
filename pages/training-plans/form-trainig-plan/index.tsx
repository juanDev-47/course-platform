/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@apollo/client';
import FormTrainingPlan from '@components/FormTrainingPlan';
import Loading from '@components/Loading';
import { CREATE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { GET_TRAININGPLANS } from 'graphql/queries/trainingPlan';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const index = () => {
  const resQuery = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });
  const [createTrainingPlan, resCreate] = useMutation(CREATE_TRAININGPLAN, {
    refetchQueries: [GET_TRAININGPLANS],
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await createTrainingPlan({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          Courses: data.selectCourses.map((course: any) => ({ id: course.id })),
        },
      },
    });
    if (resCreate.error) {
      toast.error('Error');
    } else {
      router.push('/training-plans');
      toast.success('Training plan created successfully');
    }
  };
  if (resQuery.loading || resCreate.loading) return <Loading />;

  return (
    <FormTrainingPlan
      dataForm={{
        title: 'Create training plan',
        textSubmit: 'Create',
        availableCourses: resQuery.data.getCourses,
      }}
      onSubmit={onSubmit}
    />
  );
};

export default index;
