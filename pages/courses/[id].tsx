import { useRouter } from 'next/router';
import React from 'react'
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
    const props = await matchRoles(context);
    return {
      props: JSON.parse(JSON.stringify(props)),
    };
  }

const formUpdateCourse = () => {

  const router = useRouter();
  const { id } = router.query || '';

  console.log(id);


  return (
    <div>formUpdateCourse</div>
  )
}

export default formUpdateCourse;