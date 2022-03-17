import { TrainingPlanResolvers } from 'graphql/models/trainingPlan/resolvers';
import { CoursesResolvers } from './models/course/resolvers';

export const resolvers = [TrainingPlanResolvers, CoursesResolvers];
