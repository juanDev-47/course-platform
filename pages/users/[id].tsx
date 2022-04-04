import { useMutation, useQuery } from '@apollo/client';
import Button from '@components/Button';
import SelectAddAndRemove from '@components/SelectAddAndRemove';
import TrainingPlanItem from '@components/TrainingPlanItem';
import { Box, Modal } from '@mui/material';
import { TrainingPlan } from '@prisma/client';
import { GET_EMPLOYEE } from 'graphql/queries/employees';
import { UPDATE_USER_TRAINING_PLANS } from 'graphql/mutations/userTrainingPlan';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const UserInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, router, push } = useRedirect();
  const id = router.query ? router.query.id : '';
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

  return (
    <div>
      <Button isSubmit={false} text='Agregar plan' onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box className='w-9/12 p-3 m-auto bg-white place-content-center my-1/4'>
          <SelectAddAndRemove
            ItemComponent={TrainingPlanItem}
            listAvailable={availablePlans}
            listSelect={selectedPlans}
            setListAvailable={setAvailablePlan}
            setListSelect={setSelectedPlans}
            titleAvailable='avalaible plans'
            titleSelect='assigned plans'
          />
          <div className='flex flex-row grid grid-cols-2 my-2'>
            <Button isSubmit={false} text='Cancel' onClick={handleClose} />
            <Button isSubmit={false} text='Save' onClick={handleSave} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserInfo;
