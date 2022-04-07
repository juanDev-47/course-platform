import { gql } from '@apollo/client';

const GET_USER_COURSE = gql`
  query Query($getUserCourseId: ID!) {
    getUserCourse(id: $getUserCourseId) {
      course {
        id
        name
        hours
        platform
        link
        CourseNotes {
          id
          isLike
          user {
            name
            image
          }
          note
          numberOfLikes
        }
      }
      finish
    }
  }
`;

export { GET_USER_COURSE };
