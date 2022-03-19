/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Form from 'components/Form';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import SelectAddAndRemove from 'components/SelectAddAndRemove';
import { GET_COURSES_FORMTRAINIGPLAN } from 'graphql/queries/course';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TRAININGPLAN } from 'graphql/mutations/trainingPlan';
import { Course } from 'interfaces/TrainingPlan';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';
import { matchRoles } from 'utils/matchRoles';
import CourseItem from 'components/CourseItem';
import { useRouter } from 'next/router';
import { GET_TRAININGPLAN_BY_ID } from 'graphql/queries/trainingPlan';

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const formTrainingPlan = () => {
  const { data, loading } = useQuery(GET_COURSES_FORMTRAINIGPLAN, {
    fetchPolicy: 'cache-and-network',
  });

  const [createTrainingPlan, res] = useMutation(CREATE_TRAININGPLAN);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [selectCourses, setSelectCourses] = useState<Course[]>([]);
  const [dataForm, setDataForm] = useState<any>({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const router = useRouter();
  const idparam = router.query.id;
  const resQuery = useQuery(GET_TRAININGPLAN_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getTrainingPlanId: idparam,
    },
  });
  useEffect(() => {
    if (idparam) {
      setId(idparam[0]);
      console.log(id);
      setDataForm({
        title: 'Edit training plan',
        textSubmit: 'Edit',
        message: 'Training plan Edit successfully',
      });
    } else {
      setDataForm({
        title: 'Create training plan',
        textSubmit: 'Create',
        message: 'Training plan created successfully',
      });
    }
  }, []);

  useEffect(() => {
    if (resQuery.data) {
      setName(resQuery.data.getTrainingPlan.name);
      setDescription(resQuery.data.getTrainingPlan.description);
    }
  }, [resQuery.data]);

  useEffect(() => {
    if (data) {
      setAvailableCourses(data.getCourses);
    }
  }, [data]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    await createTrainingPlan({
      variables: {
        data: {
          name,
          description,
          Courses: selectCourses.map((course) => ({ id: course.id })),
        },
      },
    });
    if (res.error) {
      toast.error('Error');
    } else {
      router.push('/training-plans');
      toast.success(dataForm.message);
    }
  };

  if (loading || res.loading) return <Loading />;

  return (
    <div>
      <Form
        title={dataForm.title}
        textSubmit={dataForm.textSubmit}
        onSubmit={submitForm}
      >
        <div className='flex flex-col gap-4 w-[1200px]'>
          <Input
            type='text'
            text='Name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextArea
            text='description'
            placeholder='description'
            value={description}
            name='description'
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <SelectAddAndRemove
            titleSelect='Selected courses'
            titleAvailable='Available courses'
            listSelect={selectCourses}
            setListSelect={setSelectCourses}
            listAvailable={availableCourses}
            setListAvailable={setAvailableCourses}
            ItemComponent={CourseItem}
          />
        </div>
      </Form>
    </div>
  );
};

export default formTrainingPlan;
