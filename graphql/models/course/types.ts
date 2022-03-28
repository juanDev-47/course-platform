import { gql } from 'apollo-server-micro';

const CourseTypes = gql`
  type Course {
    id: ID
    name: String
    hours: Int
    platform: Platform
    link: String
    TrainingPlans: [TrainingPlan]
    CourseNotes: [CourseNote]
    UserCourse: [UserCourse]
    createdAt: Date
    updatedAt: Date
  }

  enum Platform {
    Platzi
    Udemy
    Udacity
    Edx
    Coursera
    Acamica
    Youtube
  }
  type Query {
    getCourses: [Course]
    getCourse(id: ID!): Course
  }

  type Mutation {
    createCourse(
      name: String!
      hours: Int!
      platform: String!
      link: String!
    ): Course
  }
`;

export { CourseTypes };
