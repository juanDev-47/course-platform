import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import Table from '@components/Table';
import { GET_EMPLOYEES } from 'graphql/queries/employees';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, [loading]);

  if (loading) return <Loading />;
  return (
    <div>
      <Table
        tittles={[
          { title: 'Nombre', keyCol: 'name' },
          { title: 'Email', keyCol: 'email' },
        ]}
        data={data.getEmployees}
        colsClass='grid-cols-2'
        title='Usuarios'
      />
    </div>
  );
};

export default Index;
