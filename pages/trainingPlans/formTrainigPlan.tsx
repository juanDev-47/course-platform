import React from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';

const formTrainigPlan = () => (
  <div>
    <Form title='Create trainig plan' textSubmit='Create'>
      <div className='flex flex-col gap-4 w-[1000px]'>
        <Input type='text' text='Name' placeholder='Name' name='name' />
        <TextArea
          text='description'
          placeholder='description'
          name='description'
        />
        <SelectAddAndRemove />
      </div>
    </Form>
  </div>
);

export default formTrainigPlan;
