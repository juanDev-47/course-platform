import { gql } from '@apollo/client';

const CREATE_TRAININGPLAN = gql`
  mutation CreateTrainingPlan($data: TrainingPlanCreateInput!) {
    createTrainingPlan(data: $data) {
      id
    }
  }
`;

const UPDATE_TRAININGPLAN = gql`
  mutation UpdateTrainingPlan(
    $where: TrainingPlanFilterId!
    $data: TrainingPlanUpdateInput!
  ) {
    updateTrainingPlan(where: $where, data: $data) {
      id
    }
  }
`;

const DELETE_TRAININGPLAN = gql`
  mutation DeleteTrainingPlan($where: TrainingPlanFilterId!) {
    deleteTrainingPlan(where: $where) {
      id
    }
  }
`;

export { CREATE_TRAININGPLAN, UPDATE_TRAININGPLAN, DELETE_TRAININGPLAN };
