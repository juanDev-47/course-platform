import { gql } from '@apollo/client';

const GET_USER_TRAINING_PLANS_BY_USER = gql`
  query GetUserTrainingPlansByUser($getUserTrainingPlansByUserId: ID!) {
    getUserTrainingPlansByUser(id: $getUserTrainingPlansByUserId) {
      id
      progress
      trainingPlan {
        name
        numberOfCourses
      }
    }
  }
`;

const GET_USER_TRAINING_PLAN_ID = gql`
  query Query($getUserTrainingPlanId: ID!) {
    getUserTrainingPlan(id: $getUserTrainingPlanId) {
      trainingPlan {
        id
        name
        description
        numberOfCourses
        PlanComments {
          comment
          user {
            name
            image
          }
        }
      }
      progress
      UserCourse {
        id
        course {
          name
          hours
          platform
          link
        }
        finish
      }
    }
  }
`;

export { GET_USER_TRAINING_PLANS_BY_USER, GET_USER_TRAINING_PLAN_ID };
