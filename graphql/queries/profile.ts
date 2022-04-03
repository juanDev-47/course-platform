import { gql } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    getUserProfile(userId: $userId) {
      id
      userId
      name
      position
      phone
      address
      customImage
    }
  }
`;

export { GET_USER_PROFILE };
