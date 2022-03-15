import { gql } from 'apollo-server-micro';
import { TrainingPlanTypes } from 'graphql/models/trainingPlan/types';

const genericTypes = gql`
  scalar Date
  input StringEditField {
    set: String
  }
  input FloatEditField {
    set: Float
  }
  input IntEditField {
    set: Int
  }
  input DateEditField {
    set: Date
  }
  input BooleanEditField {
    set: Boolean
  }
`;

export const types = [genericTypes, TrainingPlanTypes];
