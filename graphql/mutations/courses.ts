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

const UPDATE_COURSE = gql`
  mutation UpdateCourse($where: CourseFilterId!, $data: CourseUpdateInput!) {
    updateCourse(where: $where, data: $data) {
      id
      name
    }
  }
`

export { CREATE_COURSE, DELETE_COURSE, UPDATE_COURSE };
