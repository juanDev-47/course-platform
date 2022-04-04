import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    emailVerified: Date
    image: String
    PlanComments: [PlanComment]
    CourseNotes: [CourseNote]
    noteLikes: [CourseNote]
    UserTrainingPlan: [UserTrainingPlan]
    UserCourse: [UserCourse]
    createdAt: Date
    updatedAt: Date
    profile: Profile
    role: Role
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(data: CreateUpdateInput!): User
  }

  input CreateUpdateInput {
    name: String
    email: String
    roleId: String
    auth0Id: String
    image: String
    profile: ProfileInput
  }

  input ProfileInput {
    name: String
    phone: String
    address: String
    position: String
    customImage: String
  }
`;

export { UserTypes };
