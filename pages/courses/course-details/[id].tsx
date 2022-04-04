import { useMutation, useQuery } from '@apollo/client';
import CommentDiv from '@components/CommentDiv';
import Loading from '@components/Loading';
import noteItem from '@components/noteItem';
import { ADD_LIKE, CREATE_COURSE_NOTE } from 'graphql/mutations/courseNote';
import { GET_USER_COURSE } from 'graphql/queries/userCourse';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const CourseDetails = () => {
  const router = useRouter();
  const idCourse = router.query ? router.query.id : '';
  const { data, loading } = useQuery(GET_USER_COURSE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserCourseId: idCourse,
    },
  });

  const [createCourseNote, resCreate] = useMutation(CREATE_COURSE_NOTE, {
    refetchQueries: [GET_USER_COURSE],
  });

  const [addLike, resAddLike] = useMutation(ADD_LIKE, {
    refetchQueries: [GET_USER_COURSE],
  });

  const { data: session }: any = useSession();

  const onSend = async (note: string) => {
    await createCourseNote({
      variables: {
        data: {
          note,
          userId: {
            id: session.user.id,
          },
          courseId: {
            id: data.getUserCourse.course.id,
          },
        },
      },
    });
  };

  const onLike = async (id: string) => {
    const { isLike } = data.getUserCourse.course.CourseNotes.find(
      (courseNote) => courseNote.id === id
    );
    await addLike({
      variables: {
        data: {
          id,
          isLike,
          userId: {
            id: session.user.id,
          },
        },
      },
    });
  };
  if (loading || resCreate.loading || resAddLike.loading) {
    return <Loading />;
  }
  return (
    <div className='mt-8 flex flex-col gap-5 mx-1 sm:mx-5 lg:mx-16 my-10 overflow-hidden'>
      <CommentDiv
        onSend={onSend}
        imageUser={session.user.image}
        title='Notes'
        comments={data.getUserCourse.course.CourseNotes}
        ItemComponent={noteItem}
        onClickItem={onLike}
      />
    </div>
  );
};

export default CourseDetails;
