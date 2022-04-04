import { gql } from '@apollo/client';

const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      id
      name
    }
  }
`;

export { GET_ROLES };
