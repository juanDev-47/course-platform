export interface TrainingPlan {
  id: String;
  name: String;
  description: String;
  Courses: Course[];
}

export type Course = {
  id: String;
  name: String;
  platform: String;
};
