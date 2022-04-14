import React, { useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import Form from '@components/Form';
import Input from '@components/Input';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_USER } from 'graphql/mutations/user';
import Loading from '@components/Loading';
import SelectForm from '@components/Select';
import { GET_ROLES } from 'graphql/queries/roles';
import { Role } from 'interfaces';
import useRedirect from 'hooks/useRedirect';

export async function getServerSideProps(context: any) {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `https://${process.env.AUTH0_ISSUER}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.API_EXPLORER_CLIENT_ID,
      client_secret: process.env.API_EXPLORER_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_ISSUER}/api/v2/`,
    }),
  };

  const token = await axios.request(options);

  const authValues = await matchRoles(context);
  const props = { ...authValues, token: token.data.access_token };
  return { props };
}

type Props = {
  token: string;
};

interface UserCreateResponse {
  data: {
    email: string;
    name: string;
    picture: string;
    user_id: string;
  };
}

const NewUser = ({ token }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password] = useState(`${nanoid()}*`);

  const [createUser, resCreate] = useMutation(CREATE_USER);
  const resRoles = useQuery(GET_ROLES);
  const { push } = useRedirect();

  const onSubmit = async (e) => {
    e.preventDefault();
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `https://capacitations-management.us.auth0.com/api/v2/users`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
        connection: 'Username-Password-Authentication',
      },
    };
    try {
      const userCreateResponse: UserCreateResponse = await axios.request(
        options
      );
      const userCreateData = await createUser({
        variables: {
          data: {
            email: userCreateResponse.data.email,
            name: userCreateResponse.data.name,
            image: userCreateResponse.data.picture,
            auth0Id: userCreateResponse.data.user_id,
            roleId: role?.value,
            profile: {
              name,
              address,
              position,
              phone,
              customImage: userCreateResponse.data.picture,
            },
          },
        },
      });
      if (userCreateData.data) setShowPassword(true);
      toast.success(`User created successfully ${password}`, {
        autoClose: false,
      });
      setShowPassword(true);
      resetForm();
    } catch (error) {
      toast.error('Error creating user');
    }
  };

  const resetForm = () => {
    setAddress('');
    setEmail('');
    setName('');
    setPhone('');
    setPosition('');
    setRole(null);
  };

  if (resRoles.loading || resCreate.loading) return <Loading />;
  return (
    <>
      {showPassword && (
        <div className='flex justify-center mt-3'>
          <div className='flex flex-col p-5 border rounded border-solid border-white'>
            <span className='text-xl text-white mb-2 font-bold'>
              User Created
            </span>
            <span className='text-lg text-white'>Email: {email}</span>
            <span className='text-lg text-white'>Password: {password}</span>
          </div>
        </div>
      )}
      <div className='flex justify-center'>
        <Form
          title='Create User'
          onSubmit={onSubmit}
          onCancel={() => push('/users')}
          textSubmit='Save'
        >
          <div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Name'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                isRequired
              />
              <Input
                type='text'
                text='Email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                isRequired
              />
            </div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Position'
                placeholder='Position'
                name='position'
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
                isRequired
              />
              <SelectForm
                options={resRoles.data.getRoles.map((roleOpt: Role) => ({
                  value: roleOpt.id,
                  label: roleOpt.name,
                }))}
                title='Select Role'
                onChange={(e) => {
                  setRole(e);
                }}
              />
            </div>
            <div className='flex flex-col sm:flex-row '>
              <Input
                type='text'
                text='Phone'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <Input
                type='text'
                text='address'
                placeholder='Address'
                name='address'
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewUser;
