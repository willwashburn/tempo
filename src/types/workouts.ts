import { Media } from './media';

export type WorkoutsRequest = {
  start_time: string;
  end_time: string;
};

export type ClassSession = {
  active: boolean;
  class_start_video_timestamp: string;
  description: string;
  difficulty: number;
  duration: string;
  end_time: string;
  exclude_from_recents: boolean;
  id: string;
  instructor: Instructor;
  media: Media[];
  mediaconvert_job_id: string;
  muscle_groups: string[];
  music_type: string;
  publish_time: string;
  start_time: string;
  style: number;
  subtitle: string;
  subtype: string[];
  tags: string[];
  title: string;
  workout_plan: unknown;
};

export type WorkoutPlan = {
  periods: WorkoutPeriod[];
};

export type WorkoutPeriod = {
  circuits: WorkoutCircuit[];
  title: string;
};

export type WorkoutCircuit = {
  events: WorkoutEvent[];
  title: string;
  hero_metric?: HeroMetric;
};

export type WorkoutEvent =
  | MonologueWorkoutEvent
  | RestWorkoutEvent
  | SetWorkoutEvent
  | UntrackedSetWorkoutEvent;

export type MonologueWorkoutEvent = {
  duration: string;
  type: 'monologue';
};

export type RestWorkoutEvent = {
  duration: string;
  type: 'rest';
  weight_change?: WeightChange;
};

export type WeightChange = {
  target_exercise_id: string;
  weight: Weight;
};

export type Weight = {
  type: string;
  value: number;
};

export type SetWorkoutEvent = {
  duration: string;
  type: 'set';
  exercise_id: string;
  reps: number;
  hero_metric?: HeroMetric;
  target_heartrate_zone?: number;
};

export type UntrackedSetWorkoutEvent = {
  duration: string;
  name: string;
  type: 'untracked-set';
};

export type Workout = {
  calories: number;
  class_session: ClassSession;
  completed_on_mobile: boolean;
  end_time: string;
  id: string;
  leaderboard_denominator: number;
  leaderboard_numerator: number;
  leaderboard_size: number;
  media: Media[];
  reps: number;
  reps_leaderboard_rank: number;
  score: number;
  start_time: string;
  user_id: string;
  volume: string;
  volume_leaderboard_rank: number;
};

export type Instructor = {
  active: boolean;
  created: string;
  email: string;
  first_name: string;
  has_accepted_terms: boolean;
  has_completed_assessment: boolean;
  id: string;
  last_name: string;
  media: Media[];
  performance: unknown;
  preferences: unknown;
  role: string;
  username: string;
};

type HeroMetric = 'Pace' | 'Reps' | 'HeartRate';

export type SuccessfulWorkoutsResponse = {
  data: Workout[];
};

export type FailedWorkoutsResponse = Record<string, never>;
