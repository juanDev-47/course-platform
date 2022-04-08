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
import React, { useState, useEffect } from 'react';
import { matchRoles } from 'utils/matchRoles';
import Modal from '@components/Modal';
import { UPDATE_STATE, UPLOAD_CERTIFICATE } from 'graphql/mutations/userCourse';

import FileUpload from '@components/FileUpload';
import { toast } from 'react-toastify';
import { Dialog } from '@mui/material';

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

  const [updateUserCourse, resUpdateUserCourse] = useMutation(UPDATE_STATE);

  const [uploadCertificate, resUploadCertificate] =
    useMutation(UPLOAD_CERTIFICATE);

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
  const [finishState, setFinishState]: any = useState();
  const [ShowModal, setShowModal]: any = useState(false);
  useEffect(() => {
    if (data) {
      setFinishState(data.getUserCourse.finish);
    }
  }, [data]);

  const finishedCourse = async () => {
    await updateUserCourse({
      variables: {
        inputUpdateState: {
          id: idCourse,
          state: !finishState,
        },
      },
    });
    setFinishState(!finishState);
    if (!finishState) {
      setShowModal(true);
    }
  };

  // TODO: create mutation for upload file
  const successCallback = async (e) => {
    await uploadCertificate({
      variables: {
        data: {
          id: idCourse,
          certificate: e.info.url,
        },
      },
    });
    toast.success('Upload certificate successfully');
    onClick();
  };

  // file upload error method
  const errorCallback = () => {
    toast.error('error uploading file');
  };

  // close modal
  const onClick = () => {
    setShowModal(false);
  };

  const onClickItem = async (id: string) => {};
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

  if (
    loading ||
    resCreate.loading ||
    resAddLike.loading ||
    resUpdateUserCourse.loading
  ) {
    return <Loading />;
  }
  return (
    <div className='mt-8 flex flex-col gap-5 mx-1 sm:mx-5 lg:mx-16 my-10 overflow-hidden'>
      <DetailDiv title={data.getUserCourse.course.name}>
        <div className='flex flex-col gap-5 w-full'>
          <div className='flex flex-col sm:flex-row justify-around gap-5 w-full'>
            <DetailSpan title='Name' data={data.getUserCourse.course.name} />
            <DetailSpan title='Hours' data={data.getUserCourse.course.hours} />
          </div>
          <div className='flex flex-col sm:flex-row justify-around gap-5 w-full'>
            <DetailSpan title='Link' data={data.getUserCourse.course.link} />
            <DetailSpan
              title='Platform'
              data={data.getUserCourse.course.platform}
            />
          </div>
          <div className='flex flex-col sm:flex-row justify-around gap-5 w-full'>
            <div className='flex flex-col gap-3 w-full rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base sm:w-96 items-center'>
              <Button
                text={finishState ? 'unfinished' : 'finish course'}
                onClick={finishedCourse}
              />
              {finishState ? (
                <div className='flex flex-col gap-3 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base w-full items-center'>
                  <span>status</span>
                  <span>finished</span>
                </div>
              ) : (
                <div className='flex flex-col gap-3 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base w-full items-center'>
                  <span>status</span>
                  <span>In progress...</span>
                </div>
              )}
            </div>
          </div>

          <Dialog open={ShowModal} onClose={onClick}>
            <Modal onClick={onClick} text='finish Course' textButton='close'>
              <FileUpload
                errorCallback={errorCallback}
                successCallback={successCallback}
                folder='certificate'
                resourceType='raw'
                text='Upload certificate'
              />
            </Modal>
          </Dialog>
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
