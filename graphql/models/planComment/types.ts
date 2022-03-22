import { gql } from 'apollo-server-micro';

const PlanCommentTypes = gql`
  type PlanComment {
    id: ID
    comment: String
    user: User
    userId: ID
    trainingPlan: TrainingPlan
    createdAt: Date
    updatedAt: Date
  }

  input PlanCommentCreateInput {
    comment: String!
    userId: UserId!
    trainingPlanId: TrainingPlanId!
  }
  input UserId {
    id: ID!
  }
  input TrainingPlanId {
    id: ID!
  }
  type Query {
    getPlanComments: [PlanComment]
    getPlanComment(id: ID!): PlanComment
  }

  type Mutation {
    createPlanComment(data: PlanCommentCreateInput!): PlanComment
  }
`;

export { PlanCommentTypes };
