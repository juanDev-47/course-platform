import { gql } from 'apollo-server-micro';

const CourceTypes = gql`
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
    getCources: [Course]
    getCource(id: ID!): Course
  }
`;

export { CourceTypes };
