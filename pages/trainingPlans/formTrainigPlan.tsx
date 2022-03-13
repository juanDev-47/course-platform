/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import useFormData from 'hooks/useFormData';

const formTrainingPlan = () => {
  const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });
  const [createTrainingPlan] = useMutation(CREATE_TRAININGPLAN);

  const { form, formData, updateFormData } = useFormData(null);

  const submitForm = async (e) => {
    e.preventDefault();

    console.log(formData);
    // await createTrainingPlan({
    //   variables: {
    //     data: {
    //       name: 'plan 6',
    //       description: 'Holaaa mundo',
    //       Courses: [
    //         {
    //           id: 'cl0oiaks60033m2bl9ohyh3cq',
    //         },
    //         {
    //           id: 'cl0oibymo0087m2bli1dc8d1w',
    //         },
    //         {
    //           id: 'cl0oibd5r0060m2blt7eu29b1',
    //         },
    //       ],
    //     },
    //   },
    // });
  };

  if (loading) return <div>Loading....</div>;

  return (
    <div>
      <Form
        title='Create trainig plan'
        textSubmit='Create'
        onSubmit={submitForm}
        ref={form}
        onChange={updateFormData}
      >
        <div className='flex flex-col gap-4 w-[1000px]'>
          <Input type='text' text='Name' placeholder='Name' name='name' />
          <TextArea
            text='description'
            placeholder='description'
            name='description'
          />
          <SelectAddAndRemove availableCoursesParamet={data.getCourses} />
        </div>
      </Form>
    </div>
  );
};

export default formTrainingPlan;
