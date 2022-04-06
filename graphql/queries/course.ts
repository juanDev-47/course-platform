import { gql } from '@apollo/client';

const GET_COURSES_FORMTRAINIGPLAN = gql`
  query GetCourses {
    getCourses {
      id
      name
      platform
      hours
    }
  }
`;

const GET_COURSE_EDIT = gql`
  query GetCourse($getCourseId: ID!) {
    getCourse(id: $getCourseId) {
      id
      name
      hours
      platform
      link
    }
  }
`;

const GET_COURSE_NOTES = gql`
  query getCourseNotes($getCourseId: ID!) {
    getCourse(id: $getCourseId) {
      CourseNotes {
        id
        user {
          name
          image
        }
        note
        numberOfLikes
      }
    }
  }
`;

export { GET_COURSES_FORMTRAINIGPLAN, GET_COURSE_EDIT, GET_COURSE_NOTES };
