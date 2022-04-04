import { useQuery } from '@apollo/client';
import Form from '@components/Form';
import Input from '@components/Input';
import Loading from '@components/Loading';
import { GET_USER_ID } from 'graphql/queries/user';
import { useRouter } from 'next/router';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';
import Image from 'next/image';
import { toast } from 'react-toastify';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: userData, loading } = useQuery(GET_USER_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserId: id,
    },
  });

  if (loading) return <Loading />;
  if (!userData.getUser) {
    toast.error('Error creating user');
    return <Loading />;
  }
  return (
    <div>
      <div className='w-full flex flex-col items-center justify-center p-10'>
        <Image
          src={userData.getUser.profile.customImage ?? userData.getUser.image}
          alt='User Details'
          height={180}
          width={180}
          className='rounded-full'
        />
      </div>
      <div className='flex justify-center'>
        <Form title='User Details' editMode={false}>
          <div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Name'
                placeholder='Name'
                name='name'
                value={userData.getUser.name}
                disabled
              />
              <Input
                type='text'
                text='Email'
                placeholder='Email'
                name='email'
                value={userData.getUser.email}
                disabled
              />
            </div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Position'
                placeholder='Position'
                name='position'
                value={userData.getUser.profile.position}
                disabled
              />
              <Input
                type='text'
                text='Role'
                placeholder='Role'
                name='role'
                value={userData.getUser.role.name}
                disabled
              />
            </div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Phone'
                placeholder='Phone'
                name='phone'
                value={userData.getUser.profile.phone}
                disabled
              />
              <Input
                type='text'
                text='address'
                placeholder='Address'
                name='address'
                value={userData.getUser.profile.address}
                disabled
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserDetails;
