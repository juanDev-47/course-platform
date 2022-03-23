import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Form from 'components/Form';
import Select from 'components/Select'
import { matchRoles } from 'utils/matchRoles';
import Input from 'components/Input';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COURSES_FORMTRAINIGPLAN, GET_COURSE_EDIT } from 'graphql/queries/course';
import { UPDATE_COURSE } from 'graphql/mutations/courses';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export async function getServerSideProps(context: any) {
    const props = await matchRoles(context);
    return {
      props: JSON.parse(JSON.stringify(props)),
    };
  }

const formUpdateCourse = () => {

  const router = useRouter();
  const { id } = router.query || '';
  const [updateCourse, res] = useMutation(UPDATE_COURSE, {
    refetchQueries: [GET_COURSES_FORMTRAINIGPLAN],
  });  

  
  // getting course selected
  const resQuery = useQuery(GET_COURSE_EDIT, {
    fetchPolicy: 'cache-and-network',
    variables: {
        getCourseId: id,
    },
  });  
  console.log(resQuery);

  // setting values in form
  const [name, setName] = useState('');
  const [hours, setHours] = useState<number>(1);
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    if (resQuery.data !== undefined) {
        setName(resQuery.data.getCourse.name);
        setHours(resQuery.data.getCourse.hours);
        setLink(resQuery.data.getCourse.link);
        setPlatform(resQuery.data.getCourse.platform);
      }
  },[resQuery.data]);


  // function for cancel button
  const returnPage = () => {
    router.push('/courses');
  }  

  // function for update changes in course selected
  const submitFormCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // usando el createCourse para enviar la informacion
    await updateCourse({
        variables: {
            where: {
              id,
            },
            data: {
              name: {
                set: name,
              },
              hours: {
                set: hours,
              },
              link: {
                set: link,
              },
              platform: {
                set: platform,
              },
              
            },
        },
    });

    if (res.error) {
      toast.error('Error updating Course');
    } else {
      router.push('/courses');
      toast.success('Updated course successfully');
    }
  }  


  // options for select input
  const [optionsPrioridad] = useState([
    { value: 'Platzi', label: 'Platzi' },
    { value: 'Udemy', label: 'Udemy' },
    { value: 'Udacity', label: 'Udacity' },
    { value: 'Edx', label: 'Edx' },
    { value: 'Coursera', label: 'Coursera' },
    { value: 'Acamica', label: 'Acamica' },
    { value: 'Youtube', label: 'Youtube' },
  ]);
  return (
    <div>
      <Form
        title='Edit course'
        textSubmit='Edit'
        onSubmit={submitFormCourse}
        onCancel={returnPage}
      >
        <div className='flex flex-col md:w-[800px] gap-3'>
          <Input
            name='name'
            text='Name'
            placeholder='Name'
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            name='hours'
            text='Hours'
            placeholder='Hours'
            type='number'
            value={hours}
            onChange={(e) => {
              setHours(parseInt(e.target.value));
            }}
          />
          <Input
            name='link'
            text='Link'
            placeholder='Link'
            type='text'
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          {/* crear componente select */}
          <Select
            title='platform'
            options={optionsPrioridad}
            value={platform}
            onChange={(e) => {
              setPlatform(e.value);
            }}
          />
        </div>
      </Form>
    </div>
  )
}

export default formUpdateCourse;