import { matchRoles } from 'utils/matchRoles';
import React from 'react';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  let response: any = {
    props: JSON.parse(JSON.stringify(props)),
  };

  if (props.auth) {
    response = {
      ...response,
      redirect: {
        destination:
          props.user?.role.name === 'Admin'
            ? '/users'
            : `/training-plans/${props.user?.name}`,
        permanent: false,
      },
    };
  }
  return response;
}

const Home = () => <></>;

export default Home;
