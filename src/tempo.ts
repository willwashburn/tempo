import axios from 'axios';

const axiosClient = axios.create({ baseURL: 'https://api.trainwithpivot.com/v1/' });

export type TempoLoginCredentials = {
  password: string;
  email: string;
};

type TempoMedia = {
  id: string;
  index: number;
  type_id: number;
  url: string;
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
    media: TempoMedia[];
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

export type LoginResponse = SuccessfulLoginResponse | FailedLoginResponse;

export class Tempo {
  async login(loginCredentials: TempoLoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axiosClient.request<LoginResponse>({
        method: 'POST',
        url: 'login',
        data: loginCredentials,
        headers: {
          'Content-Type': 'application/json',
          Host: 'api.trainwithpivot.com',
          'Tempo-iOS-User-Id': '',
          Accept: '*/*',
          'User-Agent':
            'Tempo/1.41.1(com.core-tech-fitness.tempo; build:2; iOS 14.4.2) Alamofire/5.4.0 WillWashburn.com',
        },
      });

      return response.data;
    } catch (error) {
      return {
        errors: [
          {
            status: 500,
            title: String(error),
            detail: 'A fatal error',
          },
        ],
      };
    }
  }
}
