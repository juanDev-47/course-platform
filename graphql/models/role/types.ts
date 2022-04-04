import { gql } from 'apollo-server-micro';

const RoleTypes = gql`
  type Role {
    id: ID
    name: String
  }
  type Query {
    getRoles: [Role]
  }
`;

export { RoleTypes };
