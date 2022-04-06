import { gql } from '@apollo/client';

const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      name
      email
    }
  }
`;
const GET_EMPLOYEE = gql`
  query GetEmployee($getEmployeeId: ID!) {
    getEmployee(id: $getEmployeeId) {
      id
      name
      email
      emailVerified
      image
      availablePlans {
        name
        id
      }
      UserTrainingPlan {
        trainingPlan {
          id
          name
        }
      }
    }
  }
`;
export { GET_EMPLOYEES, GET_EMPLOYEE };
