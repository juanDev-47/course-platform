import { gql } from 'apollo-server-micro';

const ProfileTypes = gql`
  type Profile {
    id: ID
    userId: ID
    name: String
    position: String
    phone: String
    address: String
    customImage: String
  }
  type Mutation {
    updateProfile(where: ProfileFilterId!, data: ProfileUpdateInput): Profile
    updateImage(user: String, image: String): Profile
  }

  type Query {
    getUserProfile(userId: ID!): Profile
  }

  input ProfileFilterId {
    id: ID!
  }

  input ProfileUpdateInput {
    name: String
    phone: String
    address: String
    position: String
  }
`;

export { ProfileTypes };
