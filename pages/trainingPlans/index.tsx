import Table from 'components/Table';
import React from 'react';

const index = () => (
  <div className='mt-52 mx-16'>
    <Table
      title='Training Plans'
      textButtonCreate='New training Plan'
      tittles={[
        {
          title: 'col1dwadwadwadwd',
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
      ]}
      data={[
        {
          id: '1',
          col1: 'col1',
          col2: 'col2dwadwaddw',
          col3: 'col3',
        },
        {
          id: '2',
          col1: 'col1',
          col2: 'codwadwad',
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
  </div>
);

export default index;
