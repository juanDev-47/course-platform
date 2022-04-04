import { matchRoles } from 'utils/matchRoles';
import { CREATE_COURSE } from 'graphql/mutations/courses';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import Loading from '@components/Loading';
import FormCourse from '@components/FormCourse';
import useRedirect from 'hooks/useRedirect';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const CreateCourse = () => {
  const { loading, push } = useRedirect();
  const [createCourse, resCreate] = useMutation(CREATE_COURSE, {
    refetchQueries: [GET_COURSES_FORMTRAINIGPLAN],
  });

  const onSubmit = async (data: any) => {
    await createCourse({
      variables: {
        data: {
          name: data.name,
          hours: parseInt(data.hours, 10),
          platform: data.platform,
          link: data.link,
        },
      },
    });
    if (resCreate.error) {
      toast.error('Error creating Course');
    } else {
      push('/courses');
      toast.success('Course created successfully');
    }
  };

  if (resCreate.loading || loading) return <Loading />;

  return (
    <FormCourse
      dataForm={{ title: 'Create course', textSubmit: 'Create' }}
      onSubmit={onSubmit}
    />
  );
};

export default CreateCourse;
