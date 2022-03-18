import React from 'react'
import { matchRoles } from 'utils/matchRoles';
import  Form  from 'components/Form';
import Input from 'components/Input';
import Select from 'components/Select';
import { useState } from 'react';
// import { useQuery } from '@apollo/client';
import { CREATE_COURSE } from 'graphql/mutations/courses';
import { useMutation } from '@apollo/client';

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

export default function CreateCourse() {

  const [name, setName] = useState('');
  const [hours, setHours] = useState<number>(1);
  const [link, setLink] = useState('');
  const [platform, setPlatform] = useState('');

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

  // queries 
  // const { data } = useQuery(CREATE_COURSE);
  const [ createCourse, res] = useMutation(CREATE_COURSE);

  let submitFormCourse = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // usando el createCourse para enviar la informacion
    await createCourse({
      variables:{
        name: name,
        hours: hours,
        platform: platform,
        link: link
      }
    });
  }


  return (
    <div >
      <Form title='create course' textSubmit='Create' onSubmit={submitFormCourse}

      >
        <div className='flex flex-col md:w-[800px] gap-3'>
          <Input name='name' text='Name' placeholder='Name' type='text' value={name} onChange={(e) => {
            setName(e.target.value)
          }} />
          <Input name='hours' text='Hours' placeholder='Hours' type='number' value={hours} onChange={(e) => {
            setHours(parseInt(e.target.value))
          }} />
          <Input name='link' text='Link' placeholder='Link' type='text' value={link} onChange={(e) => {
            setLink(e.target.value)
          }} />
          {/* crear componente select */}
          <Select title='platform' options={optionsPrioridad} onChange={(e) => {
            setPlatform(e.value)
          }} />
        </div>
      </Form>

    </div>
  );
}
