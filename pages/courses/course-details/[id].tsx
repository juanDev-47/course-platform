import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import CommentDiv from '@components/CommentDiv';
import DetailDiv from '@components/DetailDiv';
import DetailSpan from '@components/DetailSpan';
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

  // finished course method
  
  const finishedCourse = () => {
    console.log('Hola desde el boton finish ');
    console.log(data.getUserCourse.finish);
    
  }

  // metodo para cargar el certificado
  const upload = () => {

  }

  const onClickItem = async (id: string) => {}
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
    <div className="">
      <DetailDiv title={data.getUserCourse.course.name}>
        <div className='flex flex-col gap-5 w-full'>
          <div className='flex flex-col sm:flex-row justify-around gap-5 w-full'>
            <DetailSpan
              title='Name'
              data={
                data.getUserCourse.course.name
              }
            />
            <DetailSpan
              title='Hours'
              data={data.getUserCourse.course.hours}
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-around gap-5 w-full'>
            <DetailSpan
              title='Link'
              data={
                data.getUserCourse.course.link
              }
            />
            <DetailSpan
              title='Platform'
              data={data.getUserCourse.course.platform}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-around gap-5 w-full">
            <div className='flex flex-col gap-3 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base w-full items-center'>
              <Button text={ data.getUserCourse.finish ? 'unfinished': 'finish course' } onClick={finishedCourse} />
            </div>
            {data.getUserCourse.finish?
              <div className='flex flex-col gap-3 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base w-full items-center'>
                <Button text='Upload certificate' onClick={upload} />
              </div>: 
              <div className='flex flex-col gap-3 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base w-full items-center'>
              <span>status</span>
              <span>In progress...</span>
            </div>
            }
            
          </div>
          
        </div>
      </DetailDiv>


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
