import { gql } from '@apollo/client';

const GET_COURSES_FORMTRAINIGPLAN = gql`
  query GetCources {
    getCources {
      id
      name
      platform
    }
  }
`;

export { GET_COURSES_FORMTRAINIGPLAN };
