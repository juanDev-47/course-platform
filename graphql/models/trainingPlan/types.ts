import { gql } from 'apollo-server-micro';

const TrainingPlanTypes = gql`
  type TrainingPlan {
    id: ID
    name: String
    description: String
    Courses: [Course]
    PlanComments: [PlanComment]
    UserTrainingPlan: [UserTrainingPlan]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getTrainingPlans: [TrainingPlan]
    getTrainingPlan(id: ID!): TrainingPlan
  }
`;

export { TrainingPlanTypes };
