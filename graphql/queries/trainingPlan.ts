import { gql } from '@apollo/client';

const GET_TRAININGPLANS = gql`
  query GetTrainingPlans {
    getTrainingPlans {
      id
      name
      numberOfCourses
    }
  }
`;

export { GET_TRAININGPLANS };
