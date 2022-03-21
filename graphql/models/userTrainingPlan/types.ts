import { gql } from 'apollo-server-micro';

const UserTrainingPlanTypes = gql`
  type UserTrainingPlan {
    id: ID
    user: User
    trainingPlan: TrainingPlan
    progress: Decimal
    UserCourse: [UserCourse]
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getUserTrainingPlans: [UserTrainingPlan]
    getUserTrainingPlan(id: ID!): UserTrainingPlan
    getUserTrainingPlanByUser(id: ID!): [UserTrainingPlan]
  }
`;

export { UserTrainingPlanTypes };
