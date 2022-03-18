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
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
`;

export { UserTypes };
