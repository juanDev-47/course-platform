import { useMutation, useQuery } from '@apollo/client';
import Form from '@components/Form';
import Input from '@components/Input';
import Loading from '@components/Loading';
import { GET_USER_ID } from 'graphql/queries/user';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { matchRoles } from 'utils/matchRoles';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { GET_EMPLOYEE } from 'graphql/queries/employees';
import { TrainingPlan } from '@prisma/client';
import { UPDATE_USER_TRAINING_PLANS } from 'graphql/mutations/userTrainingPlan';
import Button from '@components/Button';
import { Box, Modal } from '@mui/material';
import SelectAddAndRemove from '@components/SelectAddAndRemove';
import TrainingPlanItem from '@components/TrainingPlanItem';
import PrivateComponent from '@components/PrivateComponent';
import { GET_USER_TRAINING_PLANS_BY_USER } from 'graphql/queries/userTrainingPlan';
import Table from '@components/Table';

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

  const [open, setOpen] = React.useState(false);
  const [updateEmployeePlans, resEmployeePlansUpdate] = useMutation(
    UPDATE_USER_TRAINING_PLANS
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    employeeQuery.refetch();
  };
  const handleSave = async () => {
    const data = selectedPlans.map((plan: TrainingPlan) => ({
      trainingPlanId: plan.id,
      userId: id,
    }));
    await updateEmployeePlans({
      variables: {
        user: id,
        data,
      },
    });
    if (resEmployeePlansUpdate.error) {
      toast.error('Error assigning plan');
    } else {
      toast.success('plan assigned successfully');
      handleClose();
    }
  };
  let employeeQuery = useQuery(GET_EMPLOYEE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getEmployeeId: id,
    },
  });
  const userPlansQuery = useQuery(GET_USER_TRAINING_PLANS_BY_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getUserTrainingPlansByUserId: id,
    },
  });
  const [dataPlans, setDataPlans] = useState([{}]);
  const [availablePlans, setAvailablePlan] = useState<TrainingPlan[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<TrainingPlan[]>([]);
  useEffect(() => {
    if (!employeeQuery.loading && employeeQuery.data) {
      setAvailablePlan(employeeQuery.data.getEmployee.availablePlans);
      setSelectedPlans(
        employeeQuery.data.getEmployee.UserTrainingPlan.map(
          (ut) => ut.trainingPlan
        )
      );
    }
  }, [employeeQuery.loading]);
  useEffect(() => {
    if (!userPlansQuery.loading) {
      setDataPlans(
        userPlansQuery.data.getUserTrainingPlansByUser.map((item: any) => ({
          id: item.id,
          col1: item.trainingPlan.name,
          col2: item.trainingPlan.numberOfCourses,
          col3: `${item.progress}%`,
        }))
      );
    }
  }, [userPlansQuery.loading]);

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
          <PrivateComponent roleList={['Admin']}>
            <div className='mt-3'>
              <Button
                isSubmit={false}
                text='Manage training plans'
                onClick={handleOpen}
              />
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='parent-modal-title'
              aria-describedby='parent-modal-description'
            >
              <Box
                className='w-9/12 p-3 m-auto bg-white place-content-center my-1/4 absolute rounded-lg top-1/2 left-1/2'
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <SelectAddAndRemove
                  ItemComponent={TrainingPlanItem}
                  listAvailable={availablePlans}
                  listSelect={selectedPlans}
                  setListAvailable={setAvailablePlan}
                  setListSelect={setSelectedPlans}
                  titleAvailable='Available plans'
                  titleSelect='Assigned plans'
                />
                <div className='flex flex-row space-x-2 grid grid-cols-2 my-2 mx-1'>
                  <Button
                    isSubmit={false}
                    text='Cancel'
                    onClick={handleClose}
                  />
                  <Button isSubmit={false} text='Save' onClick={handleSave} />
                </div>
              </Box>
            </Modal>
          </PrivateComponent>
        </Form>
      </div>
      {!userPlansQuery.loading && (
        <div className='w-full flex flex-col items-center justify-center p-10'>
          <Table
            title='Training Plans'
            colsClass='grid-cols-4'
            tittles={[
              {
                title: 'Name',
                keyCol: 'col1',
                customClass: 'col-span-2',
              },
              {
                title: 'Number of courses',
                keyCol: 'col2',
              },
              {
                title: 'Progress',
                keyCol: 'col3',
              },
            ]}
            data={dataPlans}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
