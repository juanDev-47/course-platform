import { gql } from '@apollo/client';

const CREATE_COURSE = gql`
  mutation CreateCourse($data: CourseCreateInput) {
  createCourse(data: $data) {
    id
  }
}
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($where: CourseFilterId!) {
    deleteCourse(where: $where) {
      id
    }
  }
`;

export { CREATE_COURSE, DELETE_COURSE };
