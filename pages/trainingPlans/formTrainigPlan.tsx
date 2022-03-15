/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import { Course } from 'interfaces/TrainingPlan';
import Loading from '@components/Loading';
import { toast } from 'react-toastify';

const formTrainingPlan = () => {
  const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });
  const [createTrainingPlan, res] = useMutation(CREATE_TRAININGPLAN);
  const [selectCourses, setSelectCourses] = useState<Course[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    await createTrainingPlan({
      variables: {
        data: {
          name,
          description,
          Courses: selectCourses.map((course) => ({ id: course.id })),
        },
      },
    });
    if (res.error) {
      toast.error('Error');
    } else {
      toast.success('Training plan created successfully');
    }
  };

  if (loading) return <Loading />;
  if (res.loading) return <Loading />;

  return (
    <div>
      <Form
        title='Create trainig plan'
        textSubmit='Create'
        onSubmit={submitForm}
      >
        <div className='flex flex-col gap-4 w-[1000px]'>
          <Input
            type='text'
            text='Name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextArea
            text='description'
            placeholder='description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <SelectAddAndRemove
            selectCourses={selectCourses}
            setSelectCourses={setSelectCourses}
            availableCoursesData={data.getCourses}
          />
        </div>
      </Form>
    </div>
  );
};

export default formTrainingPlan;
