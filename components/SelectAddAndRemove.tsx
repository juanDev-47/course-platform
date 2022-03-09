/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import ListCource from 'components/ListCource';

const SelectAddAndRemove = () => {
  const [selectCourses, setSelectCourses] = useState([{}]);
  const [availableCourses, setAvailableCourses] = useState([
    { key: 1, name: 'Cource 1', platform: 'Platform 1' },
    { key: 2, name: 'Cource 2', platform: 'Platform 2' },
    { key: 3, name: 'Cource 3', platform: 'Platform 3' },
    { key: 4, name: 'Cource 4', platform: 'Platform 4' },
    { key: 1, name: 'Cource 1', platform: 'Platform 1' },
    { key: 2, name: 'Cource 2', platform: 'Platform 2' },
    { key: 3, name: 'Cource 3', platform: 'Platform 3' },
    { key: 4, name: 'Cource 4', platform: 'Platform 4' },
  ]);

  const addCourse = (e: any) => {
    setSelectCourses([
      ...selectCourses,
      { key: 1, name: 'Cource 1', platform: 'Platform 1' },
    ]);
  };

  const removeCourse = (e: any) => {
    setAvailableCourses([
      ...availableCourses,
      { key: 1, name: 'Cource 2', platform: 'Platform 1' },
    ]);
  };
  return (
    <div className='flex flex-row gap-5'>
      <div className='flex flex-col w-full gap-3 items-center'>
        <span>Selected courses</span>
        <ListCource listCourse={selectCourses} onClick={removeCourse} />
      </div>
      <div className='flex flex-col place-content-center'>
        <span>Select</span>
      </div>
      <div className='flex flex-col w-full gap-3 items-center'>
        <span>Available courses </span>
        <ListCource listCourse={availableCourses} onClick={addCourse} />
      </div>
    </div>
  );
};

export default SelectAddAndRemove;
