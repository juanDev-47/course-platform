import Form from 'components/Form';
import Input from 'components/Input';
import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_IMAGE, UPDATE_PROFILE } from 'graphql/mutations/profile';
import Image from 'next/image';
import FileUpload from 'components/FileUpload';
import { User } from 'interfaces';
import Loading from '@components/Loading';
import { GET_USER_PROFILE } from 'graphql/queries/profile';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const { data: profileData, loading } = useQuery(GET_USER_PROFILE, {
    variables: {
      userId: user.id,
    },
  });
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [updateProfile, resUpdate] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [GET_USER_PROFILE],
  });
  const [updateImage] = useMutation(UPDATE_IMAGE, {
    refetchQueries: [GET_USER_PROFILE],
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await updateProfile({
      variables: {
        where: {
          id: profileData.getUserProfile.id,
        },
        data: {
          name,
          address,
          position,
          phone,
        },
      },
    });
    if (resUpdate.error) {
      toast.error('Error updating');
    } else {
      toast.success('Profile updated successfully');
    }
  };

  const successCallback = async (e) => {
    await updateImage({
      variables: {
        user: user.id,
        image: e.info.url,
      },
    });
    toast.success('Image updated successfully');
  };

  const errorCallback = () => {
    toast.error('error uploading file');
  };

  if (loading && !profileData) return <Loading />;
  return (
    <div>
      <div className='w-full flex flex-col items-center justify-center pb-1 pt-10'>
        <Image
          src={profileData.getUserProfile.customImage ?? user.image}
          alt='User Profile'
          height={180}
          width={180}
          className='rounded-full'
        />
        <div className='mt-6'>
          <FileUpload
            errorCallback={errorCallback}
            successCallback={successCallback}
            folder='profile-images'
            resourceType='image'
            text='Change Image'
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <Form title='Profile Details' onSubmit={onSubmit} textSubmit='Save'>
          <div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Name'
                placeholder='Name'
                name='name'
                value={profileData.getUserProfile.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                type='text'
                text='Email'
                placeholder='Email'
                name='email'
                value={user.email}
                disabled
              />
            </div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Position'
                placeholder='Position'
                name='position'
                value={profileData.getUserProfile.position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
              <Input
                type='text'
                text='Role'
                placeholder='Role'
                name='role'
                value={user.role.name}
                disabled
              />
            </div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Phone'
                placeholder='Phone'
                name='phone'
                value={profileData.getUserProfile.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <Input
                type='text'
                text='address'
                placeholder='Address'
                name='address'
                value={profileData.getUserProfile.address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
