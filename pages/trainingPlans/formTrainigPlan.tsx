import React from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';

const formTrainigPlan = () => (
  <div>
    <Form title='Form' textSubmit='Create'>
      <div className='flex flex-col gap-4 w-[800px]'>
        <Input type='text' text='Name' placeholder='Name' name='name' />
        <TextArea
          text='description'
          placeholder='description'
          name='description'
        />
      </div>
    </Form>
  </div>
);

export default formTrainigPlan;
