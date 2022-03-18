import { gql } from 'apollo-server-micro';

const CourseNoteTypes = gql`
  type CourseNote {
    id: ID
    user: User
    course: Course
    likes: [User]
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getCourseNotes: [CourseNote]
    getCourseNote(id: ID!): CourseNote
  }
`;

export { CourseNoteTypes };
