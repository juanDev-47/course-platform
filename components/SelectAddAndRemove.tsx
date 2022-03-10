import React, { useState } from 'react';
import ListCource from 'components/ListCource';
import { Course } from 'interfaces/TrainigPlan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SelectAddAndRemove = () => {
  const [selectCourses, setSelectCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([
    { id: '1', name: 'Cource 1', platform: 'Platform 1' },
    { id: '2', name: 'Cource 2', platform: 'Platform 2' },
    { id: '3', name: 'Cource 3', platform: 'Platform 3' },
    { id: '4', name: 'Cource 4', platform: 'Platform 4' },
    { id: '5', name: 'Cource 5', platform: 'Platform 1' },
    { id: '6', name: 'Cource 6', platform: 'Platform 2' },
    { id: '7', name: 'Cource 7', platform: 'Platform 3' },
    { id: '8', name: 'Cource 8', platform: 'Platform 4' },
  ]);

  const addCourse = (index: number) => {
    const cource: any = availableCourses[index];
    const updatedCources = [...availableCourses];
    updatedCources.splice(index, 1);
    setAvailableCourses(updatedCources);
    setSelectCourses([...selectCourses, cource]);
  };

  const removeCourse = (index: number) => {
    const cource: any = selectCourses[index];
    const updatedCources = [...selectCourses];
    updatedCources.splice(index, 1);
    setSelectCourses(updatedCources);
    setAvailableCourses([...availableCourses, cource]);
  };
  return (
    <div className='flex flex-row gap-5 w-full'>
      <div className='flex flex-col w-full gap-3 items-center'>
        <span className='font-semibold'>Selected courses</span>
        <ListCource listCourse={selectCourses} onClick={removeCourse} />
      </div>
      <div className='flex flex-col place-content-center gap-3'>
        <span className='font-semibold'>Select</span>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
      </div>
      <div className='flex flex-col w-full gap-3 items-center'>
        <span className='font-semibold'>Available courses </span>
        <ListCource listCourse={availableCourses} onClick={addCourse} />
      </div>
    </div>
  );
};
export default SelectAddAndRemove;
