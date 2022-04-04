import { gql } from 'apollo-server-micro';
import { TrainingPlanTypes } from 'graphql/models/trainingPlan/types';
import { CourseTypes } from 'graphql/models/course/types';
import { PlanCommentTypes } from 'graphql/models/planComment/types';
import { UserTrainingPlanTypes } from 'graphql/models/userTrainingPlan/types';
import { CourseNoteTypes } from 'graphql/models/courseNote/types';
import { UserCourseTypes } from 'graphql/models/userCourse/types';
import { UserTypes } from 'graphql/models/user/types';

const genericTypes = gql`
  scalar Date
  scalar Decimal

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
  input UserId {
    id: ID!
  }
`;

export const types = [
  genericTypes,
  TrainingPlanTypes,
  CourseTypes,
  PlanCommentTypes,
  UserTrainingPlanTypes,
  CourseNoteTypes,
  UserCourseTypes,
  UserTypes,
];
