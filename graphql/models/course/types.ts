import { gql } from 'apollo-server-micro';

const CoursesTypes = gql`
  type Course {
    id: ID
    name: String
    link: String
    createdAt: Date
  }

  type Query {
    getCourses: [Course]
  }
`;

export { CoursesTypes };
