import { gql } from '@apollo/client';

const CREATE_PLAN_COMMENT = gql`
  mutation Mutation($data: PlanCommentCreateInput!) {
    createPlanComment(data: $data) {
      id
    }
  }
`;

export { CREATE_PLAN_COMMENT };
