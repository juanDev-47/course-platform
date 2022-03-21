import React, { useState } from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';
import { Course } from 'interfaces/TrainingPlan';
import CourseItem from 'components/CourseItem';
import { useRouter } from 'next/router';

type Props = {
  dataForm: {
    title: string;
    textSubmit: string;
    availableCourses: Course[];
    selectCourses?: Course[];
    name?: string;
    description?: string;
  };
  onSubmit: (e: any) => Promise<void>;
};

const FormTrainingPlan = ({ dataForm, onSubmit }: Props) => {
  const [availableCourses, setAvailableCourses] = useState<Course[]>(
    dataForm.availableCourses
  );
  const [selectCourses, setSelectCourses] = useState<Course[]>(
    dataForm.selectCourses || []
  );
  const [name, setName] = useState(dataForm.name || '');
  const [description, setDescription] = useState(dataForm.description || '');
  const router = useRouter();

  const submitForm = async (e: any) => {
    e.preventDefault();
    onSubmit({ name, description, selectCourses });
  };

  return (
    <Form
      title={dataForm.title}
      textSubmit={dataForm.textSubmit}
      onSubmit={submitForm}
      onCancel={() => {
        router.push('/training-plans');
      }}
    >
      <div className='flex flex-col gap-4 w-[1200px]'>
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
          name='description'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <SelectAddAndRemove
          titleSelect='Selected courses'
          titleAvailable='Available courses'
          listSelect={selectCourses}
          setListSelect={setSelectCourses}
          listAvailable={availableCourses}
          setListAvailable={setAvailableCourses}
          ItemComponent={CourseItem}
        />
      </div>
    </Form>
  );
};

export default FormTrainingPlan;
