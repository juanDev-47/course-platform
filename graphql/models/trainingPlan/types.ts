import { gql } from 'apollo-server-micro';

const TrainingPlanTypes = gql`
  type TrainingPlan {
    id: ID
    name: String
    description: String
    Courses: [Course]
    PlanComments: [PlanComment]
    UserTrainingPlan: [UserTrainingPlan]
    createdAt: Date
    updatedAt: Date
  }
  input TrainingPlanCreateInput {
    name: String!
    description: String!
    Courses: [CourseId]!
  }

  input CourseId {
    id: ID!
  }

  input TrainingPlanUpdateInput {
    name: StringEditField!
    description: StringEditField!
    Courses: [CourseId]
  }

  input TrainingPlanFilterId {
    id: ID!
  }

  type Query {
    getTrainingPlans: [TrainingPlan]
    getTrainingPlan(id: ID!): TrainingPlan
  }

  type Mutation {
    createTrainingPlan(data: TrainingPlanCreateInput!): TrainingPlan
    updateTrainingPlan(
      where: TrainingPlanFilterId!
      data: TrainingPlanUpdateInput!
    ): TrainingPlan
    deleteTrainingPlan(where: TrainingPlanFilterId!): TrainingPlan
  }
`;

export { TrainingPlanTypes };
