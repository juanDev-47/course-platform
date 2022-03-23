import { gql } from '@apollo/client';

const CREATE_COURSE = gql`
  mutation CreateCourse(
    $name: String!
    $hours: Int!
    $platform: String!
    $link: String!
  ) {
    createCourse(name: $name, hours: $hours, platform: $platform, link: $link) {
      name
    }
  }
`;

export { CREATE_COURSE };
