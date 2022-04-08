import { gql } from '@apollo/client';

const UPDATE_STATE = gql`
mutation Mutation($inputUpdateState: inputUpdateState) {
    changeState(inputUpdateState: $inputUpdateState) {
    id  
    }
  }
`;

const UPLOAD_CERTIFICATE = gql`
mutation Mutation($data: inputUploadCertificate) {
  uploadCertificate(data: $data) {
    id
  }
}
`;

export  {UPDATE_STATE, UPLOAD_CERTIFICATE};