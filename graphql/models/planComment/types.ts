import { gql } from 'apollo-server-micro';

const PlanCommentTypes = gql`
  type PlanComment {
    id: ID
    comment: String
    user: User
    trainingPlan: TrainingPlan
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getPlanComments: [PlanComment]
    getPlanComment(id: ID!): PlanComment
  }
`;

export { PlanCommentTypes };
