import { gql } from '@apollo/client';

const CREATE_COURSE_NOTE = gql`
  mutation Mutation($data: CourseNoteCreateInput!) {
    CreateCourseNote(data: $data) {
      id
    }
  }
`;

const ADD_LIKE = gql`
  mutation AddLike($data: likeInput!) {
    addLike(data: $data) {
      id
    }
  }
`;

export { CREATE_COURSE_NOTE, ADD_LIKE };
