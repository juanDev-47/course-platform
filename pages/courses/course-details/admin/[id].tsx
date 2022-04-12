import { useQuery } from '@apollo/client';
import CommentDiv from '@components/CommentDiv';
import Loading from '@components/Loading';
import noteItem from '@components/noteItem';
import NotFoundComponent from '@components/NotFound';
import { GET_COURSE_NOTES } from 'graphql/queries/course';
import { useRouter } from 'next/router';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const NotesCourse = () => {
  const router = useRouter();
  const idCourse = router.query ? router.query.id : '';
  const { data, loading } = useQuery(GET_COURSE_NOTES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getCourseId: idCourse,
    },
  });
  if (loading) {
    return <Loading />;
  }

  if (!data.getCourse) return <NotFoundComponent />;

  return (
    <div className='mt-8 flex flex-col gap-5 mx-1 sm:mx-5 lg:mx-16 my-10 overflow-hidden pointer-events-none'>
      <CommentDiv
        title='Notes'
        comments={data.getCourse.CourseNotes}
        ItemComponent={noteItem}
      />
    </div>
  );
};

export default NotesCourse;
