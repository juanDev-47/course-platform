import { useMutation, useQuery } from '@apollo/client';
import CommentDiv from '@components/CommentDiv';
import Loading from '@components/Loading';
import noteItem from '@components/noteItem';
import { ADD_LIKE, CREATE_COURSE_NOTE } from 'graphql/mutations/courseNote';
import { GET_USER_COURSE } from 'graphql/queries/userCourse';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

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

  const onClickItem = async (id: string) => {
    await addLike({
      variables: {
        data: {
          id,
          userId: {
            id: session.user.id,
          },
        },
      },
    });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <CommentDiv
      onSend={onSend}
      imageUser={session.user.image}
      title='Notes'
      comments={data.getUserCourse.course.CourseNotes}
      ItemComponent={noteItem}
      onClickItem={onClickItem}
    />
  );
};

export default CourseDetails;
