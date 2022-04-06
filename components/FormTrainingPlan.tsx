import React, { useState, useEffect } from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';
import { Course } from 'interfaces/TrainingPlan';
import CourseItem from 'components/CourseItem';
import useRedirect from 'hooks/useRedirect';
import Loading from 'components/Loading';
import useFormData from 'hooks/useFormData';

type Props = {
  dataForm: {
    title: string;
    textSubmit: string;
    availableCourses: Course[];
    selectCourses?: Course[];
    name?: string;
    description?: string;
  };
  onSubmit: (data: any) => Promise<void>;
};

const FormTrainingPlan = ({ dataForm, onSubmit }: Props) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>(
    dataForm.availableCourses
  );
  const [selectCourses, setSelectCourses] = useState<Course[]>(
    dataForm.selectCourses || []
  );
  const { loading, push } = useRedirect();
  const [isValidation, setIsValidation] = useState(true);

  useEffect(() => {
    if (!isValidation) {
      setIsValidation(true);
    }
  }, [selectCourses]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (selectCourses.length < 1) {
      setIsValidation(false);
      return;
    }
    onSubmit({ ...formData, selectCourses });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Form
      title={dataForm.title}
      textSubmit={dataForm.textSubmit}
      onSubmit={submitForm}
      onCancel={() => {
        push('/training-plans');
      }}
      refForm={form}
      onChange={updateFormData}
    >
      <div className='flex flex-col w-full gap-4'>
        <Input
          type='text'
          text='Name'
          placeholder='Name'
          name='name'
          defaultValue={dataForm.name || ''}
          isRequired
        />
        <TextArea
          text='description'
          placeholder='description'
          defaultValue={dataForm.description || ''}
          name='description'
        />
        {isValidation ? (
          <></>
        ) : (
          <span className='text-red-800 text-center w-full'>
            Select at least one course
          </span>
        )}
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
