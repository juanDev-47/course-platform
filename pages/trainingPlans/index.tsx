import Table from 'components/Table';
import React from 'react';

const index = () => (
  <Table
    title='Training Plans'
    textButtonCreate='New training Plan'
    tittles={[
      {
        title: 'col1',
        keyCol: 'col1',
      },
      {
        title: 'col1',
        keyCol: 'col1',
      },
      {
        title: 'col1',
        keyCol: 'col1',
      },
    ]}
    data={[
      {
        id: '1',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
      },
      {
        id: '2',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
      },
      {
        id: '3',
        col1: 'col1',
        col2: 'col2',
        col3: 'col3',
      },
    ]}
  />
);

export default index;
