import Table from '@components/Table';
import React from 'react';

const CourseDetails = () => (
  <Table
    title='Courses'
    tittles={[
      {
        title: 'Name',
        keyCol: 'col1',
      },
      {
        title: 'Hours',
        keyCol: 'col2',
      },
      {
        title: 'Platform',
        keyCol: 'col3',
      },
      {
        title: 'Link',
        keyCol: 'col4',
      },
      {
        title: 'Status',
        keyCol: 'col5',
      },
    ]}
    colsClass='grid-cols-4'
    data={dataR}
  />
);

export default CourseDetails;
