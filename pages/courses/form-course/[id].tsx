import React from 'react';
import { matchRoles } from 'utils/matchRoles';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_COURSES_FORMTRAINIGPLAN,
  GET_COURSE_EDIT,
} from 'graphql/queries/course';
import { UPDATE_COURSE } from 'graphql/mutations/courses';
import { toast } from 'react-toastify';
import FormCourse from '@components/FormCourse';
import useRedirect from 'hooks/useRedirect';
import Loading from '@components/Loading';
import NotFoundComponent from '@components/NotFound';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const FormCourseEdit = () => {
  const { loading, router, push } = useRedirect();
  const id = router.query ? router.query.id : '';
  const [updateCourse, resUpdate] = useMutation(UPDATE_COURSE, {
    refetchQueries: [GET_COURSES_FORMTRAINIGPLAN],
  });

  const resQuery = useQuery(GET_COURSE_EDIT, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getCourseId: id,
    },
  });

  const onSubmit = async (data: any) => {
    await updateCourse({
      variables: {
        where: {
          id,
        },
        data: {
          name: {
            set: data.name || resQuery.data.getCourse.name,
          },
          hours: {
            set: data.hours
              ? parseInt(data.hours, 10)
              : resQuery.data.getCourse.hours,
          },
          link: {
            set: data.link || resQuery.data.getCourse.link,
          },
          platform: {
            set: data.platform,
          },
        },
      },
    });

    if (resUpdate.error) {
      toast.error('Error updating Course');
    } else {
      push('/courses');
      toast.success('Updated course successfully');
    }
  };

  if (resQuery.loading || loading || resUpdate.loading) return <Loading />;

  if (!resQuery.data.getCourse) return <NotFoundComponent />;
  return (
    <FormCourse
      dataForm={{
        title: 'Edit course',
        textSubmit: 'Edit',
        name: resQuery.data.getCourse.name,
        hours: resQuery.data.getCourse.hours,
        link: resQuery.data.getCourse.link,
        platform: resQuery.data.getCourse.platform,
      }}
      onSubmit={onSubmit}
    />
  );
};

export default FormCourseEdit;
