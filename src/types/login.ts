import { Media } from './media';

export type LoginCredentials = {
  password: string;
  email: string;
};

export type AuthenticatedUser = {
  id: string;
  token: string;
};

type TempoExercise = {
  exercise_id: string;
  exercise_name: string;
  progress: TempoExerciseProgress[];
};

type TempoExerciseProgress = {
  date: string;
  nudge: {
    type: string;
    unit: string;
    value: number;
  };
  weight: {
    type: string;
    unit: string;
    value: number;
  };
};

type TempoPreferences = {
  daily_training_duration: '15_to_30_mins' | '30_to_45_mins' | '45_to_60_mins';
  experience_level: 0 | 1 | 2;
  goals: {
    gain_strength: boolean;
    get_fitter: boolean;
    lose_weight: boolean;
  };
  has_used_music_selection: boolean;
  leaderboard_mode: string;
  primary_goal: string;
  workout_count: number;
  workout_days: {
    fri: boolean;
    mon: boolean;
    sat: boolean;
    sun: boolean;
    thu: boolean;
    tue: boolean;
    wed: boolean;
  };
};

export type SuccessfulLoginResponse = {
  data: {
    active: boolean;
    allow_followers: boolean;
    birthday: string;
    created: string;
    email: string;
    first_name: string;
    freshcat_restore_id?: string;
    gender: 'male' | 'female';
    has_accepted_terms: boolean;
    has_completed_assessment: boolean;
    height: number;
    id: string;
    last_login_on_mobile: string;
    last_login_on_tempo: string;
    last_name: string;
    media: Media[];
    performance: { exercises: Record<string, TempoExercise> };
    preferences: TempoPreferences;
    recharge_customer_id: number;
    role: 'customer';
    timezone: string;
    token: string;
    username: string;
    weight: number;
    workouts_per_week?: number;
  };
};

export type FailedLoginResponse = {
  errors: {
    status: number;
    title: string;
    detail: string;
  }[];
};