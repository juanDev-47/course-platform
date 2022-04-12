import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from '@components/Table';
import { GET_EMPLOYEES } from 'graphql/queries/employees';
import useRedirect from 'hooks/useRedirect';
import React from 'react';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const Index = () => {
  const { data, loading } = useQuery(GET_EMPLOYEES, {
    fetchPolicy: 'cache-and-network',
  });
  const { push } = useRedirect();
  const onClickItem = (id: string) => {
    push(`/users/${id}`);
  };

  if (loading) return <Loading />;
  return (
    <div className='mx-2 my-10 md:mx-16'>
      <Table
        tittles={[
          { title: 'Name', keyCol: 'name' },
          { title: 'Email', keyCol: 'email' },
        ]}
        data={data.getEmployees}
        colsClass='grid-cols-2'
        title='Employees'
        textButtonCreate='Create User'
        tableContext={{ onClickItem }}
      />
    </div>
  );
};

export default Index;
