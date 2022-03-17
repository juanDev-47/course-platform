import { gql } from 'apollo-server-micro';

const UserCourseTypes = gql`
  type UserCourse {
    id: ID
    course: Course
    finish: Boolean
    certificate: String
    userTraining: [UserTrainingPlan]
    user: User
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getUserCourses: [UserCourse]
    getUserCourse(id: ID!): UserCourse
  }
`;

export { UserCourseTypes };
