import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';
import {
  GET_TRAININGPLANS,
  GET_TRAININGPLAN_EDIT,
} from 'graphql/queries/trainingPlan';
import FormTrainingPlan from '@components/FormTrainingPlan';
import { matchRoles } from 'utils/matchRoles';
import useRedirect from 'hooks/useRedirect';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const FormTrainingPlanEdit = () => {
  const { loading, router, push } = useRedirect();
  const id = router.query ? router.query.id : '';
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
      push('/training-plans');
      toast.success('Training plan edited successfully');
    }
  };

  if (resQuery.loading || loading || resUpdate.loading) return <Loading />;

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

export default FormTrainingPlanEdit;
