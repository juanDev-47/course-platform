import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($data: CreateUpdateInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export { CREATE_USER };
