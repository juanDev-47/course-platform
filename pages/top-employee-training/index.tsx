import { matchRoles } from 'utils/matchRoles';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import Loading from '@components/Loading';
import { GET_TRAINING_CHART_DATA } from 'graphql/queries/userTrainingPlan';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export async function getServerSideProps(context: any) {
  const props = await matchRoles(context);
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
}

const TopEmployeeTraining = () => {
  const { data: chartData, loading } = useQuery(GET_TRAINING_CHART_DATA);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(chartData);
  }, [loading]);

  if (loading) return <Loading />;
  return (
    <div>
      <ReactApexChart
        height='500'
        options={{
          chart: {
            id: 'bar-chart',
          },
          xaxis: {
            labels: { style: { colors: '#fff' } },
          },
          yaxis: {
            labels: {
              style: { colors: '#fff' },
              formatter: (val) => val.toFixed(0),
            },
          },
          title: {
            text: 'Top 3 of employees with completed courses',
            align: 'center',
            style: {
              color: '#fff',
            },
          },
        }}
        type='bar'
        series={[
          {
            name: 'Completed courses',
            data: chartData.getTrainingChartData,
          },
        ]}
      />
    </div>
  );
};

export default TopEmployeeTraining;
