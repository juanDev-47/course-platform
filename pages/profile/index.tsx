import Form from 'components/Form';
import Input from 'components/Input';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Profile = (props: any) => {
  const { user } = props;
  return (
    <div>
      <div>
        {user.name}
        {user.id}
        {user.email}
      </div>
      <Form title='Form' className='flex justify-center'>
        <div className='flex flex-col md:flex-row '>
          <Input
            type='text'
            text='Name'
            placeholder='Name'
            name='name'
            currentValue={user.name}
          />
          <Input
            type='text'
            text='Phone'
            placeholder='Phone'
            name='phone'
            currentValue={user.email}
          />
        </div>
      </Form>

      <div className='flex flex-col md:flex-row justify-center'>
        <div className='m-4'>Change Photo here</div>

        <div className='m-4'>Change Password here </div>
      </div>
    </div>
  );
};

export default Profile;
