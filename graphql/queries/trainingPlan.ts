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

const GET_TRAININGPLAN_BY_ID = gql`
  query Query($getTrainingPlanId: ID!) {
    getTrainingPlan(id: $getTrainingPlanId) {
      name
      description
      Courses {
        id
        name
        platform
      }
    }
  }
`;

export { GET_TRAININGPLAN_BY_ID };
