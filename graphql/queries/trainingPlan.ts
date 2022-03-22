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

const GET_TRAININGPLAN_EDIT = gql`
  query Query($getTrainingPlanId: ID!) {
    getTrainingPlan(id: $getTrainingPlanId) {
      name
      description
      Courses {
        id
        name
        platform
      }
      AvailableCourses {
        id
        name
        platform
      }
    }
  }
`;

export { GET_TRAININGPLAN_EDIT, GET_TRAININGPLANS };
