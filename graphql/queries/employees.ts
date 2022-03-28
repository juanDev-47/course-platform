import { gql } from '@apollo/client';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      name
      email
    }
  }
`;

export { GET_EMPLOYEES };
