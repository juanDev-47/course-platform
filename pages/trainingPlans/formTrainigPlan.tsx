/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useQuery } from '@apollo/client';

const formTrainigPlan = () => {
  const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div>Loading....</div>;

  return (
    <div>
      <Form title='Create trainig plan' textSubmit='Create'>
        <div className='flex flex-col gap-4 w-[1000px]'>
          <Input type='text' text='Name' placeholder='Name' name='name' />
          <TextArea
            text='description'
            placeholder='description'
            name='description'
          />
          <SelectAddAndRemove availableCoursesParamet={data.getCources} />
        </div>
      </Form>
    </div>
  );
};

export default formTrainigPlan;
