import React, { useState } from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import Select from 'components/Select';
import useRedirect from 'hooks/useRedirect';
import useFormData from 'hooks/useFormData';
import Loading from 'components/Loading';

type Props = {
  dataForm: {
    title: string;
    textSubmit: string;
    name?: string;
    hours?: string;
    link?: string;
    platform?: string;
  };
  onSubmit: (data: any) => Promise<void>;
};

const FormCourse = ({ dataForm, onSubmit }: Props) => {
  const { loading, push } = useRedirect();
  const { form, formData, updateFormData } = useFormData(null);
  const [platform, setPlatform] = useState(dataForm.platform || '');

  const [platformOptions] = useState([
    { value: 'Platzi', label: 'Platzi' },
    { value: 'Udemy', label: 'Udemy' },
    { value: 'Udacity', label: 'Udacity' },
    { value: 'Edx', label: 'Edx' },
    { value: 'Coursera', label: 'Coursera' },
    { value: 'Acamica', label: 'Acamica' },
    { value: 'Youtube', label: 'Youtube' },
  ]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    onSubmit({ ...formData, platform });
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
        push('/courses');
      }}
      onChange={updateFormData}
      refForm={form}
    >
      <div className='flex flex-col w-full gap-4'>
        <Input
          isRequired
          name='name'
          text='Name'
          placeholder='Name'
          type='text'
          value={formData.name}
          defaultValue={dataForm.name}
        />
        <Input
          isRequired
          name='hours'
          text='Hours'
          placeholder='Hours'
          type='number'
          value={formData.hours}
          defaultValue={dataForm.hours}
        />
        <Input
          isRequired
          name='link'
          text='Link'
          placeholder='Link'
          type='text'
          value={formData.link}
          defaultValue={dataForm.link}
        />
        <Select
          title='platform'
          options={platformOptions}
          onChange={(e) => {
            setPlatform(e.value);
          }}
        />
      </div>
    </Form>
  );
};

export default FormCourse;
