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
  input createUserTrainingPlans {
    userId: ID!
    trainingPlanId: ID!
  }
  type TrainingChartData {
    x: String
    y: Int
  }
  type Query {
    getUserTrainingPlans: [UserTrainingPlan]
    getUserTrainingPlan(id: ID!): UserTrainingPlan
    getUserTrainingPlansByUser(id: ID!): [UserTrainingPlan]
    getTrainingChartData: [TrainingChartData]
  }
  type Mutation {
    updateUserTrainingPlans(
      data: [createUserTrainingPlans]
      user: ID!
    ): [UserTrainingPlan]
  }
`;

export { UserTrainingPlanTypes };
