import { gql } from 'apollo-server-micro';
import { TrainingPlanTypes } from 'graphql/models/trainingPlan/types';
import { CourceTypes } from 'graphql/models/course/types';
import { PlanCommentTypes } from 'graphql/models/planComment/types';
import { UserTrainingPlanTypes } from 'graphql/models/userTrainingPlan/types';
import { CourseNoteTypes } from 'graphql/models/courseNote/types';
import { UserCourseTypes } from 'graphql/models/userCourse/types';
import { UserTypes } from 'graphql/models/user/types';

const genericTypes = gql`
  scalar Date
`;

export const types = [
  genericTypes,
  TrainingPlanTypes,
  CourceTypes,
  PlanCommentTypes,
  UserTrainingPlanTypes,
  CourseNoteTypes,
  UserCourseTypes,
  UserTypes,
];
