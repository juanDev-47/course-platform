import { gql } from '@apollo/client';

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($where: ProfileFilterId!, $data: ProfileUpdateInput!) {
    updateProfile(where: $where, data: $data) {
      id
    }
  }
`;

const UPDATE_IMAGE = gql`
  mutation UpdateImage($user: String, $image: String) {
    updateImage(user: $user, image: $image) {
      id
    }
  }
`;

export { UPDATE_PROFILE, UPDATE_IMAGE };
