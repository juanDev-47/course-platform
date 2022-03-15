import { gql } from 'apollo-server-micro';

const TrainingPlanTypes = gql`
  type TrainingPlan {
    id: ID
    name: String
    description: String
  }
  type Query {
    getTrainingPlans: [TrainingPlan]
  }
`;

export { TrainingPlanTypes };
