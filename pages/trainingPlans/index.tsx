import Table from '@components/Table';
import React from 'react';

const index = () => (
  <Table
    tittles={[
      {
        title: 'col1',
        keyCol: 'col1',
      },
      {
        title: 'col2',
        keyCol: 'col2',
      },
      {
        title: 'col3',
        keyCol: 'col3',
      },
      {
        title: 'col4',
        keyCol: 'col4',
      },
    ]}
    data={[
      {
        id: '1',
        col1: 'Col1',
        col2: 'col2',
        col3: 'col3',
        col4: 'col4',
      },
    ]}
  />
);

export default index;
