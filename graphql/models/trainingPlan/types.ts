import { gql } from 'apollo-server-micro';

const TrainingPlanTypes = gql`

  type TrainingPlan{
    id:     ID                 
    name:   String
    description:  String
    Courses:      [Course]
    PlanComments:     [PlanComment]
    UserTrainingPlan: [UserTrainingPlan]
    createdAt: Date          
    updatedAt:  Date          
  }
  type Query {
    getTrainingPlans: [TrainingPlan]
  }
  type Mutation {
    createTrainingPlan(data: TrainingPlan!): TrainingPlan
    updateTrainingPlan(id: String!, data: TrainingPlan!): TrainingPlan
    deleteTrainingPlan(id: String!): TrainingPlan
  }
`;

export { TrainingPlanTypes };