import { gql } from '@apollo/client';

const GET_USER_TRAINING_PLAN_BY_USER = gql`
  query GetUserTrainingPlanByUser($getUserTrainingPlanByUserId: ID!) {
    getUserTrainingPlanByUser(id: $getUserTrainingPlanByUserId) {
      id
      trainingPlan {
        id
        name
        numberOfCourses
      }
      progress
    }
  }
`;

export { GET_USER_TRAINING_PLAN_BY_USER };
