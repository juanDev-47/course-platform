import { gql } from '@apollo/client';

const GET_USER_COURSE = gql`
  query Query($getUserCourseId: ID!) {
    getUserCourse(id: $getUserCourseId) {
      course {
        name
        hours
        platform
        link
        CourseNotes {
          id
          user {
            name
            image
          }
          numberOfLikes
        }
      }
      finish
    }
  }
`;

export { GET_USER_COURSE };
