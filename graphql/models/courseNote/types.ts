import { gql } from 'apollo-server-micro';

const CourseNoteTypes = gql`
  type CourseNote {
    id: ID
    userId: ID
    user: User
    course: Course
    courseId: ID
    note: String
    likes: [User]
    isLike: Boolean
    numberOfLikes: Int
    createdAt: Date
    updatedAt: Date
  }

  input CourseNoteCreateInput {
    note: String!
    userId: userId!
    courseId: courseId!
  }

  input likeInput {
    id: ID!
    userId: userId!
    isLike: Boolean!
  }

  input userId {
    id: ID!
  }
  input courseId {
    id: ID!
  }
  type Query {
    getCourseNotes: [CourseNote]
    getCourseNote(id: ID!): CourseNote
  }

  type Mutation {
    CreateCourseNote(data: CourseNoteCreateInput!): CourseNote
    addLike(data: likeInput!): CourseNote
    deleteLike(data: likeInput): CourseNote
  }
`;

export { CourseNoteTypes };
