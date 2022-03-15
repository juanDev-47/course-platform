import ListCource from 'components/ListCource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Course } from 'interfaces/TrainingPlan';

const SelectAddAndRemove = ({
  selectCourses,
  setSelectCourses,
  availableCoursesData,
}: any) => {
  const [availableCourses, setAvailableCourses] =
    useState<Course[]>(availableCoursesData);
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
