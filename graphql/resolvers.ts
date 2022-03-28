import { TrainingPlanResolvers } from 'graphql/models/trainingPlan/resolvers';
import { CourseResolvers } from 'graphql/models/course/resolvers';
import { PlanCommentResolvers } from 'graphql/models/planComment/resolvers';
import { UserTrainingPlanResolvers } from 'graphql/models/userTrainingPlan/resolvers';
import { CourseNoteResolvers } from 'graphql/models/courseNote/resolvers';
import { UserCourseResolvers } from 'graphql/models/userCourse/resolvers';
import { UserResolvers } from 'graphql/models/user/resolvers';

export const resolvers = [
  TrainingPlanResolvers,
  CourseResolvers,
  PlanCommentResolvers,
  UserTrainingPlanResolvers,
  CourseNoteResolvers,
  UserCourseResolvers,
  UserResolvers,
  
];
