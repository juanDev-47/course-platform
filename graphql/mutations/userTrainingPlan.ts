import { gql } from '@apollo/client';

const UPDATE_USER_TRAINING_PLANS = gql`
  mutation UpdateUserTrainingPlans(
    $data: [createUserTrainingPlans]!
    $user: ID!
  ) {
    updateUserTrainingPlans(data: $data, user: $user) {
      id
    }
  }
`;

export { UPDATE_USER_TRAINING_PLANS };
