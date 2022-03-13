import { gql } from 'apollo-server-micro';

const TrainingPlanTypes = gql`
  type TrainingPlan {
    id: ID
    name: String
    description: String
  }
  type Query {
    getTrainingPlans: [TrainingPlan]
  }
`;

export { TrainingPlanTypes };

// Courses: [Course]
// PlanComments: [PlanComment]
// UserTrainingPlan: [UserTrainingPlan]
// createdAt: Date
// updatedAt: Date

// type Mutation {
//   createTrainingPlan(data: TrainingPlan!): TrainingPlan
//   updateTrainingPlan(id: String!, data: TrainingPlan!): TrainingPlan
//   deleteTrainingPlan(id: String!): TrainingPlan
// }
